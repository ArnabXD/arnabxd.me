/// <reference path="../.astro/types.d.ts" />
/// <reference path="../worker-configuration.d.ts" />

// Merge Telegram secrets into the generated Cloudflare Env.
// Secrets are set with `wrangler secret put …` and therefore don't appear
// in `wrangler.jsonc`, so we declare them manually here.
declare namespace Cloudflare {
  interface Env {
    TELEGRAM_BOT_TOKEN?: string;
    TELEGRAM_CHAT_ID?: string;
  }
}
