export const CONTENT_TYPES = [
  "banner",
  "update",
  "newsletter",
  "gallery",
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

export type ContentItem = {
  id: string;
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
  createdAt: string | null;
  updatedAt: string | null;
};

export type ArticleView = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  body: string[];
  gallery?: string[];
};

export type BannerView = {
  src: string;
  title: string;
  description: string;
  href: string;
};

export type GalleryView = {
  src: string;
  alt: string;
  caption: string;
};

export function isContentType(value: unknown): value is ContentType {
  return (
    typeof value === "string" &&
    (CONTENT_TYPES as readonly string[]).includes(value)
  );
}

export function isContentItem(value: unknown): value is ContentItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ContentItem>;
  return (
    typeof item.id === "string" &&
    isContentType(item.type) &&
    typeof item.title === "string" &&
    typeof item.description === "string" &&
    Array.isArray(item.body) &&
    Array.isArray(item.gallery)
  );
}

export function contentItemsToArticles(items: ContentItem[]): ArticleView[] {
  return items.flatMap((item) =>
    item.slug
      ? [
          {
            slug: item.slug,
            title: item.title,
            date: item.date ?? "",
            excerpt: item.description,
            image: item.image ?? "/logo.svg",
            body: item.body,
            gallery: item.gallery.length ? item.gallery : undefined,
          },
        ]
      : [],
  );
}

export function contentItemsToBanners(items: ContentItem[]): BannerView[] {
  return items.flatMap((item) =>
    item.image
      ? [
          {
            src: item.image,
            title: item.title,
            description: item.description,
            href: item.href ?? "/updates",
          },
        ]
      : [],
  );
}

export function contentItemsToGallery(items: ContentItem[]): GalleryView[] {
  return items.flatMap((item) =>
    item.image
      ? [
          {
            src: item.image,
            alt: item.alt ?? item.title,
            caption: item.caption ?? item.title,
          },
        ]
      : [],
  );
}
