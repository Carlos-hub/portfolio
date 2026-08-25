import { NextResponse, type NextRequest } from "next/server";
import { isLocale, pickLocale, type Locale } from "@/lib/i18n";

/**
 * Markdown for Agents: an agent that sends `Accept: text/markdown` gets the
 * markdown view of the homepage; browsers (which ask for text/html) keep the
 * HTML. `Vary: Accept` keeps caches from mixing the two up.
 */
function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const types = accept.split(",").map((t) => t.trim().toLowerCase());
  const md = types.some((t) => t.startsWith("text/markdown"));
  if (!md) return false;
  // An explicit text/html preference wins — that's a browser, not an agent.
  return !types.some((t) => t.startsWith("text/html"));
}

function markdownRewrite(req: NextRequest, locale: Locale) {
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}/index.md`;
  const res = NextResponse.rewrite(url);
  res.headers.set("Vary", "Accept, Accept-Language");
  // Next owns the Vary header on the prerendered HTML, so a shared cache could
  // otherwise store this markdown body under the plain page key and hand it to
  // a browser. Keep the negotiated response uncached; agents that want a
  // cacheable copy can hit /{locale}/index.md directly.
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segment = pathname.split("/")[1];

  // Already on a localized page: only content negotiation is left to do.
  if (isLocale(segment)) {
    if (wantsMarkdown(req.headers.get("accept"))) {
      return markdownRewrite(req, segment);
    }
    const res = NextResponse.next();
    res.headers.append("Vary", "Accept");
    return res;
  }

  // Root: send the visitor to the language they asked for. A redirect (not a
  // rewrite) so each language keeps one canonical, indexable URL.
  const locale = pickLocale(req.headers.get("accept-language"));

  if (wantsMarkdown(req.headers.get("accept"))) {
    return markdownRewrite(req, locale);
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}`;
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Vary", "Accept, Accept-Language");
  return res;
}

// Must be static literals: Next reads this at build time. Keep in sync with
// LOCALES in lib/i18n.ts.
export const config = {
  matcher: ["/", "/pt", "/en"],
};
