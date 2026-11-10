import { banners, gallery } from "../data/gallery";
import { newsletters } from "../data/newsletters";
import { updates } from "../data/updates";
import type { ContentItem, ContentType } from "./types";
import { isContentType } from "./types";
import type { ContentWrite } from "./validate";

export interface CmsDatabase {
  exec(query: string): Promise<unknown>;
  prepare(query: string): CmsStatement;
}

interface CmsStatement {
  bind(...values: unknown[]): CmsStatement;
  all<T>(): Promise<{ results?: T[] }>;
  first<T>(): Promise<T | null>;
  run(): Promise<{ meta?: { changes?: number } }>;
}

export interface CmsBucket {
  put(
    key: string,
    value: ArrayBuffer,
    options?: { httpMetadata?: { contentType?: string } },
  ): Promise<unknown>;
  get(
    key: string,
  ): Promise<{
    body: ReadableStream;
    httpMetadata?: { contentType?: string };
  } | null>;
}

type ContentRow = {
  id: string;
  type: string;
  slug: string | null;
  title: string;
  description: string;
  date: string | null;
  image: string | null;
  href: string | null;
  body: string;
  gallery: string;
  alt: string | null;
  caption: string | null;
  sort_order: number;
  created_at: string | null;
  updated_at: string | null;
};

const ready = new WeakMap<CmsDatabase, Promise<void>>();

function timestamp() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

function parseList(value: string) {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function toItem(row: ContentRow): ContentItem | null {
  if (!isContentType(row.type)) return null;
  return {
    id: row.id,
    type: row.type,
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: row.date,
    image: row.image,
    href: row.href,
    body: parseList(row.body),
    gallery: parseList(row.gallery),
    alt: row.alt,
    caption: row.caption,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function migrate(db: CmsDatabase) {
  await db
    .prepare(
      "CREATE TABLE IF NOT EXISTS content (id TEXT PRIMARY KEY, type TEXT NOT NULL, slug TEXT, title TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', date TEXT, image TEXT, href TEXT, body TEXT NOT NULL DEFAULT '[]', gallery TEXT NOT NULL DEFAULT '[]', alt TEXT, caption TEXT, sort_order INTEGER NOT NULL DEFAULT 0, created_at TEXT, updated_at TEXT)",
    )
    .run();
  await db
    .prepare(
      "CREATE TABLE IF NOT EXISTS cms_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)",
    )
    .run();
}

async function seed(db: CmsDatabase) {
  const seeded = await db
    .prepare("SELECT value FROM cms_meta WHERE key = 'seeded'")
    .first<{ value: string }>();
  if (seeded?.value === "1") return;

  const count = await db
    .prepare("SELECT COUNT(*) AS count FROM content")
    .first<{ count: number }>();
  if ((count?.count ?? 0) > 0) {
    await db
      .prepare("INSERT INTO cms_meta (key, value) VALUES ('seeded', '1')")
      .run();
    return;
  }

  const now = timestamp();
  const rows: ContentWrite[] = [
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
      sortOrder: 0,
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
      sortOrder: 0,
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
      sortOrder: 0,
    })),
    ...gallery.map((item) => ({
      type: "gallery" as const,
      slug: null,
      title: item.caption,
      description: "",
      date: null,
      image: item.src,
      href: null,
      body: [],
      gallery: [],
      alt: item.alt,
      caption: item.caption,
      sortOrder: 0,
    })),
  ];

  const counts = new Map<ContentType, number>();
  for (const row of rows) {
    const index = counts.get(row.type) ?? 0;
    counts.set(row.type, index + 1);
    await db
      .prepare(
        `INSERT INTO content (
          id, type, slug, title, description, date, image, href, body, gallery,
          alt, caption, sort_order, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        `default:${row.type}:${index}`,
        row.type,
        row.slug,
        row.title,
        row.description,
        row.date,
        row.image,
        row.href,
        JSON.stringify(row.body),
        JSON.stringify(row.gallery),
        row.alt,
        row.caption,
        index,
        now,
        now,
      )
      .run();
  }

  await db
    .prepare("INSERT INTO cms_meta (key, value) VALUES ('seeded', '1')")
    .run();
}

export function prepareDatabase(db: CmsDatabase) {
  let pending = ready.get(db);
  if (!pending) {
    pending = migrate(db)
      .then(() => seed(db))
      .catch((error: unknown) => {
        ready.delete(db);
        throw error;
      });
    ready.set(db, pending);
  }
  return pending;
}

export async function listContent(db: CmsDatabase, type: ContentType) {
  await prepareDatabase(db);
  const result = await db
    .prepare(
      `SELECT * FROM content
       WHERE type = ?
       ORDER BY sort_order ASC, updated_at DESC`,
    )
    .bind(type)
    .all<ContentRow>();
  return (result.results ?? []).flatMap((row) => {
    const item = toItem(row);
    return item ? [item] : [];
  });
}

export async function getContent(db: CmsDatabase, id: string) {
  await prepareDatabase(db);
  const row = await db
    .prepare("SELECT * FROM content WHERE id = ?")
    .bind(id)
    .first<ContentRow>();
  return row ? toItem(row) : null;
}

export async function createContent(db: CmsDatabase, input: ContentWrite) {
  await prepareDatabase(db);
  const now = timestamp();
  const id = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO content (
        id, type, slug, title, description, date, image, href, body, gallery,
        alt, caption, sort_order, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      input.type,
      input.slug,
      input.title,
      input.description,
      input.date,
      input.image,
      input.href,
      JSON.stringify(input.body),
      JSON.stringify(input.gallery),
      input.alt,
      input.caption,
      input.sortOrder,
      now,
      now,
    )
    .run();
  return getContent(db, id);
}

export async function updateContent(
  db: CmsDatabase,
  id: string,
  input: ContentWrite,
) {
  await prepareDatabase(db);
  const now = timestamp();
  const result = await db
    .prepare(
      `UPDATE content SET
        type = ?, slug = ?, title = ?, description = ?, date = ?, image = ?,
        href = ?, body = ?, gallery = ?, alt = ?, caption = ?, sort_order = ?,
        updated_at = ?
       WHERE id = ?`,
    )
    .bind(
      input.type,
      input.slug,
      input.title,
      input.description,
      input.date,
      input.image,
      input.href,
      JSON.stringify(input.body),
      JSON.stringify(input.gallery),
      input.alt,
      input.caption,
      input.sortOrder,
      now,
      id,
    )
    .run();
  if (!result.meta?.changes) return null;
  return getContent(db, id);
}

export async function deleteContent(db: CmsDatabase, id: string) {
  await prepareDatabase(db);
  const result = await db
    .prepare("DELETE FROM content WHERE id = ?")
    .bind(id)
    .run();
  return Boolean(result.meta?.changes);
}
