import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
};

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} · NightHost`;
    document.title = fullTitle;

    upsertMetaByName("description", description);
    upsertMetaByProperty("og:title", fullTitle);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:type", "website");

    const url = path
      ? `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`
      : window.location.href;
    upsertMetaByProperty("og:url", url);

    // A subtle default; replace on backend if you add a real OG image.
    upsertMetaByProperty("og:image", `${window.location.origin}/favicon.png`);
    upsertMetaByProperty("twitter:card", "summary_large_image");
    upsertMetaByProperty("twitter:title", fullTitle);
    upsertMetaByProperty("twitter:description", description);
  }, [title, description, path]);

  return null;
}
