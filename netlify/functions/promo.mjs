// Netlify adapter. Functions v2 already speaks WHATWG Request/Response, so the
// router drops straight in and production runs the same code as `npm run dev`.
import { handleRequest } from '../../server/router.mjs';

export default async (request) => handleRequest(request);

export const config = {
  path: ['/api/promo/stats', '/api/promo/claim', '/api/admin/*', '/r/*'],
};
