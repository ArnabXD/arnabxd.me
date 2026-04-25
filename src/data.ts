import raw from "../data.json" with { type: "json" };
import type { SiteData } from "./types";

export const data = raw as SiteData;
export default data;
