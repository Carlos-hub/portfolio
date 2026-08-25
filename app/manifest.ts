import type { MetadataRoute } from "next";
import { AUTHOR_SHORT, siteCopy } from "@/lib/site";
import { DEFAULT_LOCALE, HTML_LANG } from "@/lib/i18n";

export default function manifest(): MetadataRoute.Manifest {
  const copy = siteCopy(DEFAULT_LOCALE);
  return {
    name: copy.siteName,
    short_name: AUTHOR_SHORT,
    description: copy.description,
    lang: HTML_LANG[DEFAULT_LOCALE],
    start_url: `/${DEFAULT_LOCALE}`,
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
  };
}
