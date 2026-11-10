import { isContentType, type ContentItem, type ContentType } from "./types";

export type ContentWrite = {
  id?: string;
  type: ContentType;
  slug: string | null;
  title: string;
  description: string;
  date: string | null;
  image: string | null;
  href: string | null;
  body: string[];
  gallery: string[];
  alt: string | null;
  caption: string | null;
  sortOrder: number;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function optionalText(
  value: unknown,
  field: string,
  details: string[],
): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") {
    details.push(`${field} 必須是文字`);
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function parseContentWrite(
  input: unknown,
  method: "POST" | "PUT",
): { ok: true; value: ContentWrite } | { ok: false; details: string[] } {
  const details: string[] = [];
  const body =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};

  let id: string | undefined;
  if (method === "PUT") {
    if (typeof body.id !== "string" || !body.id.trim()) {
      details.push("id 為必填");
    } else {
      id = body.id.trim();
    }
  }

  if (!isContentType(body.type)) {
    details.push("type 無效");
  }

  let title = "";
  if (typeof body.title !== "string" || !body.title.trim()) {
    details.push("title 為必填");
  } else {
    title = body.title.trim();
  }

  let description = "";
  if (body.description !== undefined) {
    if (typeof body.description !== "string") {
      details.push("description 必須是文字");
    } else {
      description = body.description.trim();
    }
  }

  const slug = optionalText(body.slug, "slug", details);
  if (
    (body.type === "update" || body.type === "newsletter") &&
    !slug
  ) {
    details.push("文章 slug 為必填");
  } else if (slug && !SLUG_PATTERN.test(slug)) {
    details.push("slug 只可包含小寫英數字及單一連字號");
  }

  const date = optionalText(body.date, "date", details);
  const image = optionalText(body.image, "image", details);
  const href = optionalText(body.href, "href", details);
  const alt = optionalText(body.alt, "alt", details);
  const caption = optionalText(body.caption, "caption", details);

  let paragraphs: string[] = [];
  if (body.body !== undefined) {
    if (!isStringArray(body.body)) details.push("body 必須是文字陣列");
    else paragraphs = body.body.map((line) => line.trim()).filter(Boolean);
  }

  let gallery: string[] = [];
  if (body.gallery !== undefined) {
    if (!isStringArray(body.gallery)) details.push("gallery 必須是文字陣列");
    else gallery = body.gallery.map((line) => line.trim()).filter(Boolean);
  }

  let sortOrder = 0;
  if (body.sortOrder !== undefined) {
    if (typeof body.sortOrder !== "number" || !Number.isInteger(body.sortOrder)) {
      details.push("sortOrder 必須是整數");
    } else {
      sortOrder = body.sortOrder;
    }
  }

  if (details.length || !isContentType(body.type)) {
    return { ok: false, details };
  }

  return {
    ok: true,
    value: {
      id,
      type: body.type,
      slug: slug ?? null,
      title,
      description,
      date: date ?? null,
      image: image ?? null,
      href: href ?? null,
      body: paragraphs,
      gallery,
      alt: alt ?? null,
      caption: caption ?? null,
      sortOrder,
    },
  };
}

export function toContentItem(
  write: ContentWrite & { id: string },
  createdAt: string | null,
  updatedAt: string | null,
): ContentItem {
  return {
    id: write.id,
    type: write.type,
    slug: write.slug,
    title: write.title,
    description: write.description,
    date: write.date,
    image: write.image,
    href: write.href,
    body: write.body,
    gallery: write.gallery,
    alt: write.alt,
    caption: write.caption,
    sortOrder: write.sortOrder,
    createdAt,
    updatedAt,
  };
}
