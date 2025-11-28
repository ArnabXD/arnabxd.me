import { type PlatformProxy } from "wrangler";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}