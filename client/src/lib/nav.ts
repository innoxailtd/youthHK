export type NavChild = {
  title: string;
  href: string;
};

export type NavItem = {
  title: string;
  href: string;
  children?: NavChild[];
};

export const navigation: NavItem[] = [
  { title: "首頁", href: "/" },
  {
    title: "關於本會",
    href: "/about",
    children: [
      { title: "簡介及宗旨", href: "/about" },
      { title: "組織架構", href: "/about/organization" },
      { title: "合作團體", href: "/about/partners" },
    ],
  },
  { title: "最新會訊", href: "/newsletters" },
  { title: "最新動態", href: "/updates" },
  {
    title: "加入本會",
    href: "/join",
    children: [
      { title: "線上入會", href: "/join" },
      { title: "下載表格", href: "/join/forms" },
    ],
  },
  { title: "聯絡我們", href: "/contact" },
];
