import { banners, gallery } from "../data/gallery";
import { newsletters } from "../data/newsletters";
import { updates } from "../data/updates";
import { isContentItem, type ContentItem, type ContentType } from "./types";
import type { ContentWrite } from "./validate";

const CONTENT_KEY = "content";

export interface CmsKv {
  get(key: string, options: { type: "json" }): Promise<unknown>;
  getWithMetadata(
    key: string,
    options: { type: "arrayBuffer" },
  ): Promise<{
    value: ArrayBuffer | null;
    metadata: { contentType?: string } | null;
  }>;
  put(
    key: string,
    value: string | ArrayBuffer,
    options?: { metadata?: { contentType?: string } },
  ): Promise<void>;
}

function timestamp() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

function buildSeed(): ContentItem[] {
  const now = timestamp();
  const rows: Array<Omit<ContentItem, "id" | "createdAt" | "updatedAt" | "sortOrder">> = [
    ...banners.map((banner) => ({
      type: "banner" as const,
      slug: null,
      title: banner.title,
      description: banner.description,
      date: null,
      image: banner.src,
      href: banner.href,
      body: [],
      gallery: [],
      alt: null,
      caption: null,
    })),
    ...updates.map((article) => ({
      type: "update" as const,
      slug: article.slug,
      title: article.title,
      description: article.excerpt,
      date: article.date,
      image: article.image,
      href: null,
      body: article.body,
      gallery: article.gallery ?? [],
      alt: null,
      caption: null,
    })),
    ...newsletters.map((article) => ({
      type: "newsletter" as const,
      slug: article.slug,
      title: article.title,
      description: article.excerpt,
      date: article.date,
      image: article.image,
      href: null,
      body: article.body,
      gallery: article.gallery ?? [],
      alt: null,
      caption: null,
    })),
    ...gallery.map((item) => ({
      type: "gallery" as const,
      slug: null,
      title: item.caption,
      description: "",
      date: null,
      image: item.src,
      href: null,
      body: [] as string[],
      gallery: [] as string[],
      alt: item.alt,
      caption: item.caption,
    })),
  ];

  const counts = new Map<ContentType, number>();
  return rows.map((row) => {
    const index = counts.get(row.type) ?? 0;
    counts.set(row.type, index + 1);
    return {
      ...row,
      id: `default:${row.type}:${index}`,
      sortOrder: index,
      createdAt: now,
      updatedAt: now,
    };
  });
}

async function loadAll(kv: CmsKv) {
  const stored = await kv.get(CONTENT_KEY, { type: "json" });
  if (stored === null) {
    const seeded = buildSeed();
    await kv.put(CONTENT_KEY, JSON.stringify(seeded));
    return seeded;
  }
  return Array.isArray(stored) ? stored.filter(isContentItem) : [];
}

async function saveAll(kv: CmsKv, items: ContentItem[]) {
  await kv.put(CONTENT_KEY, JSON.stringify(items));
}

function byType(items: ContentItem[], type: ContentType) {
  return items
    .filter((item) => item.type === type)
    .sort((left, right) => {
      if (left.sortOrder !== right.sortOrder) return left.sortOrder - right.sortOrder;
      return (right.updatedAt ?? "").localeCompare(left.updatedAt ?? "");
    });
}

export async function listContent(kv: CmsKv, type: ContentType) {
  return byType(await loadAll(kv), type);
}

export async function createContent(kv: CmsKv, input: ContentWrite) {
  const items = await loadAll(kv);
  const now = timestamp();
  const item: ContentItem = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  items.push(item);
  await saveAll(kv, items);
  return item;
}

export async function updateContent(kv: CmsKv, id: string, input: ContentWrite) {
  const items = await loadAll(kv);
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const current = items[index];
  if (!current) return null;
  const item: ContentItem = {
    ...input,
    id,
    createdAt: current.createdAt,
    updatedAt: timestamp(),
  };
  items[index] = item;
  await saveAll(kv, items);
  return item;
}

export async function deleteContent(kv: CmsKv, id: string) {
  const items = await loadAll(kv);
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  await saveAll(kv, next);
  return true;
}

export async function putMedia(
  kv: CmsKv,
  key: string,
  body: ArrayBuffer,
  contentType: string,
) {
  await kv.put(key, body, { metadata: { contentType } });
}

export async function getMedia(kv: CmsKv, key: string) {
  const result = await kv.getWithMetadata(key, { type: "arrayBuffer" });
  if (!result.value) return null;
  return {
    body: result.value,
    contentType: result.metadata?.contentType ?? "application/octet-stream",
  };
}
