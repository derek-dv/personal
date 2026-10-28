import { NextRequest, NextResponse } from "next/server";

const ALLOWED_SITES: Record<
  string,
  { url: string; baseHref: string; userAgent: string }
> = {
  github: {
    url: "https://github.com/derek-dv",
    baseHref: "https://github.com/",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  },
  "github-repos": {
    url: "https://github.com/derek-dv?tab=repositories",
    baseHref: "https://github.com/",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/derek-dv",
    baseHref: "https://www.linkedin.com/",
    // LinkedIn serves the full public profile HTML to social preview user-agents
    userAgent: "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  },
};

export async function GET(request: NextRequest) {
  const siteKey = request.nextUrl.searchParams.get("site") || "github";
  const target = ALLOWED_SITES[siteKey] || ALLOWED_SITES.github;

  try {
    const upstream = await fetch(target.url, {
      headers: {
        "User-Agent": target.userAgent,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 300 },
    });

    let html = await upstream.text();

    // Inject <base href="..."> and target="_blank" so relative CSS/JS/images resolve
    // and clicking any link inside the iframe opens cleanly or stays functional.
    const baseInjection = `
      <base href="${target.baseHref}" target="_blank" />
      <style>
        /* Hide annoying cookie/sign-in modal overlays on public profile embeds */
        .contextual-sign-in-modal,
        .sign-in-modal,
        #artdeco-global-alert-container,
        .cta-modal {
          display: none !important;
        }
        body {
          overflow-x: auto !important;
        }
      </style>
    `;

    if (html.includes("<head>")) {
      html = html.replace("<head>", `<head>${baseInjection}`);
    } else if (html.includes("<head ")) {
      html = html.replace(/<head[^>]*>/i, (match) => `${match}${baseInjection}`);
    } else {
      html = `${baseInjection}${html}`;
    }

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    return new NextResponse(
      `<!DOCTYPE html><html><body style="font-family:Segoe UI,sans-serif;padding:24px;">
        <h3>Internet Explorer cannot display the webpage</h3>
        <p>${err instanceof Error ? err.message : "Connection failed"}</p>
      </body></html>`,
      {
        status: 502,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }
}
