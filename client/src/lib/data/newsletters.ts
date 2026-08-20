import type { Article } from "@/lib/data/updates";

function numbered(dir: string, count: number, ext: string) {
  return Array.from(
    { length: count },
    (_, index) => `${dir}/${String(index + 1).padStart(2, "0")}${ext}`,
  );
}

export const newsletters: Article[] = [
  {
    slug: "2025-03",
    title: "香港青年會會訊－2025年3月",
    date: "2025-03-17",
    excerpt: "本期會訊回顧本會近期會務、品牌活動籌備及青年交流。",
    image: "/images/newsletters/2025-03-cover.png",
    body: [],
    gallery: numbered("/images/newsletters/2025-03", 22, ".png"),
  },
  {
    slug: "2024-12",
    title: "香港青年會會訊－2024年12月",
    date: "2025-01-01",
    excerpt: "年終會訊總結2024年會務成果，展望三十周年慶祝系列。",
    image: "/images/newsletters/2024-12-cover.png",
    body: [],
    gallery: numbered("/images/newsletters/2024-12", 24, ".png"),
  },
  {
    slug: "2024-08",
    title: "香港青年會會訊－2024年8月",
    date: "2024-09-01",
    excerpt: "本期會訊分享2024年夏季會務、活動花絮與會員動態。",
    image: "/images/newsletters/2024-08-cover.png",
    body: [],
    gallery: numbered("/images/newsletters/2024-08", 13, ".jpg"),
  },
];

export function getNewsletter(slug: string) {
  return newsletters.find((item) => item.slug === slug);
}
