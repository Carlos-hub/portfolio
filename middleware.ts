import { NextResponse, type NextRequest } from "next/server";

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

export function middleware(req: NextRequest) {
  if (wantsMarkdown(req.headers.get("accept"))) {
    const url = req.nextUrl.clone();
    url.pathname = "/index.md";
    const res = NextResponse.rewrite(url);
    res.headers.set("Vary", "Accept");
    // Next owns the Vary header on the prerendered HTML for "/", so a shared
    // cache could otherwise store this markdown body under the plain "/" key
    // and hand it to a browser. Keep the negotiated response uncached; agents
    // that want a cacheable copy can hit /index.md directly.
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }

  const res = NextResponse.next();
  res.headers.append("Vary", "Accept");
  return res;
}

export const config = { matcher: "/" };
