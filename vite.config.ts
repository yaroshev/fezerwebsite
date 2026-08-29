import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';

const API_PREFIXES = ['/api/', '/r/'];

/**
 * Runs the promo API inside the dev server.
 *
 * In production these paths are served by a Netlify function; here the same
 * router is mounted as middleware, so `npm run dev` is the whole local stack --
 * no second process, no netlify-cli, and no drift between what you test and
 * what ships.
 */
function promoApi(env: Record<string, string>): Plugin {
  return {
    name: 'fezer-promo-api',
    apply: 'serve',
    configureServer(server) {
      // The router reads configuration from process.env, the way it will in the
      // function; .env values are lifted across without clobbering the shell.
      for (const [key, value] of Object.entries(env)) {
        if (!(key in process.env)) process.env[key] = value;
      }

      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        const path = req.url ?? '/';
        if (!API_PREFIXES.some((prefix) => path.startsWith(prefix))) return next();

        try {
          const { handleRequest } = await server.ssrLoadModule('/server/router.mjs');

          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const hasBody = chunks.length > 0;

          const request = new Request(`http://${req.headers.host ?? 'localhost'}${path}`, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: hasBody ? Buffer.concat(chunks) : undefined,
          });

          const response: Response = await handleRequest(request);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          console.error('[promo-api]', error);
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'server_error' }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), promoApi(loadEnv(mode, process.cwd(), ''))],
  // Ensure uppercase image extensions are treated as static assets
  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.WEBP'],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
