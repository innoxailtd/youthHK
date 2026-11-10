"use client";

import { useEffect, useState } from "react";

import {
  isContentItem,
  type ContentItem,
  type ContentType,
} from "@/lib/cms/types";

export function useCmsContent<T>(
  type: ContentType,
  fallback: T[],
  map: (items: ContentItem[]) => T[],
) {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(`/api/content?type=${type}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("無法讀取 CMS 內容");
        const data: unknown = await response.json();
        const list =
          data && typeof data === "object" && "items" in data
            ? data.items
            : null;
        if (!Array.isArray(list) || !list.every(isContentItem)) {
          throw new Error("CMS 回應格式無效");
        }
        setItems(map(list));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    void load();
    return () => controller.abort();
  }, [fallback, map, type]);

  return items;
}
