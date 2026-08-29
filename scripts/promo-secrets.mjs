#!/usr/bin/env node
// Fills the two secrets in .env without them appearing on screen or in shell
// history: the Supabase database password and the Resend API key.
//
//   node scripts/promo-secrets.mjs
//
// Everything else in .env is already set. Re-running only replaces what you
// type; press Enter on a prompt to leave that value alone.
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envPath = path.join(root, '.env');

const SUPABASE_USER = 'postgres.ynkqprfocxktsbudgvhs';
const SUPABASE_HOST = 'aws-1-us-east-1.pooler.supabase.com';
const SUPABASE_PORT = '6543';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

/** Reads a line without echoing it, so nothing sensitive stays on the screen. */
function secret(question) {
  return new Promise((resolve) => {
    const onKeypress = (char) => {
      // Redraw the prompt on every keystroke so the typed value never renders.
      if (['\n', '\r', ''].includes(char)) return;
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(question);
    };
    process.stdin.on('data', onKeypress);
    rl.question(question, (answer) => {
      process.stdin.removeListener('data', onKeypress);
      process.stdout.write('\n');
      resolve(answer.trim());
    });
  });
}

function setVar(text, key, value) {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, 'm');
  return pattern.test(text) ? text.replace(pattern, line) : `${text.replace(/\n*$/, '\n')}${line}\n`;
}

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(path.join(root, '.env.example'), envPath);
  console.log('Created .env from .env.example');
}

let env = fs.readFileSync(envPath, 'utf8');

console.log('\nTwo secrets, neither of which is echoed back.\n');
console.log('1. Supabase database password for the "Fezer Website" project.');
console.log('   Dashboard -> Connect -> Transaction pooler -> Reset database password,');
console.log('   if you no longer have it.\n');

const password = await secret('   Database password (Enter to skip): ');
if (password) {
  // The password goes into a URL, so anything outside the unreserved set has to
  // be percent-encoded or the connection string parses wrong.
  const url = `postgresql://${SUPABASE_USER}:${encodeURIComponent(password)}@${SUPABASE_HOST}:${SUPABASE_PORT}/postgres`;
  env = setVar(env, 'DATABASE_URL', url);
  console.log('   -> DATABASE_URL written\n');
} else {
  console.log('   -> left unchanged\n');
}

console.log('2. Resend API key with sending access on fezer.app.');
console.log('   https://resend.com/api-keys -> Create API Key -> Sending access.\n');

const resendKey = await secret('   Resend API key (Enter to skip): ');
if (resendKey) {
  env = setVar(env, 'RESEND_API_KEY', resendKey);
  env = setVar(env, 'PROMO_EMAIL_TRANSPORT', 'resend');
  console.log('   -> RESEND_API_KEY written, transport set to resend\n');
} else {
  console.log('   -> left unchanged\n');
}

fs.writeFileSync(envPath, env, { mode: 0o600 });
rl.close();

const present = (key) => (new RegExp(`^${key}=.+$`, 'm').test(env) ? 'set' : 'EMPTY');
console.log('.env now has:');
for (const key of ['DATABASE_URL', 'RESEND_API_KEY', 'PROMO_EMAIL_FROM', 'PROMO_ADMIN_TOKEN']) {
  console.log(`  ${key.padEnd(20)} ${present(key)}`);
}
console.log('');
