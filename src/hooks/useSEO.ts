import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
}

function setMeta(nameOrProperty: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${nameOrProperty}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, nameOrProperty);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSEO({ title, description }: SEOOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    return () => {
      document.title = previousTitle;
    };
  }, [title, description]);
}
