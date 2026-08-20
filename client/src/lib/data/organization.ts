export type OrgMember = {
  name: string;
  honorific?: "先生" | "女士";
  role?: string;
};

export type OrgGroup = {
  title: string;
  note?: string;
  members: OrgMember[];
};

export const organizationTitle = "香港青年會 第十四屆理監事會架構";

export const organizationGroups: OrgGroup[] = [
  {
    title: "永遠榮譽會長",
    note: "排名不分先後",
    members: [
      { name: "孫啟昌", honorific: "先生" },
      { name: "姜玉堆", honorific: "先生" },
      { name: "聶毅", honorific: "先生" },
      { name: "葉振都", honorific: "先生" },
      { name: "饒桂珠", honorific: "女士" },
      { name: "莊創業", honorific: "先生" },
      { name: "岑濬", honorific: "先生" },
      { name: "鄭承峰", honorific: "先生" },
      { name: "施明耀", honorific: "先生" },
      { name: "陳凱榮", honorific: "先生" },
    ],
  },
  {
    title: "首席會長",
    members: [{ name: "蔡志堅", honorific: "先生" }],
  },
  {
    title: "會長",
    note: "排名不分先後",
    members: [
      { name: "何存恩", honorific: "先生" },
      { name: "謝天", honorific: "先生" },
      { name: "崔紹裘", honorific: "先生" },
    ],
  },
  {
    title: "監事會",
    members: [
      { role: "監事長", name: "李雪萍", honorific: "女士" },
      { role: "副監事長", name: "劉玉榮", honorific: "女士" },
      { role: "監事", name: "陳凱榮", honorific: "先生" },
      { role: "監事", name: "尹樹烽", honorific: "先生" },
      { role: "監事", name: "石家杰", honorific: "先生" },
    ],
  },
  {
    title: "主席團",
    members: [
      { role: "主席", name: "鍾奇峰", honorific: "先生" },
      { role: "常務副主席", name: "劉粵儀", honorific: "女士" },
      { role: "副主席", name: "楊宇思", honorific: "女士" },
      { role: "副主席", name: "馮英傑", honorific: "先生" },
      { role: "副主席", name: "鄭翰衍", honorific: "先生" },
      { role: "副主席", name: "辛子豪", honorific: "先生" },
      { role: "副主席", name: "袁添", honorific: "先生" },
      { role: "副主席", name: "吳奕林", honorific: "女士" },
      { role: "副主席", name: "蘇俊謙", honorific: "先生" },
    ],
  },
  {
    title: "常務理事",
    members: [
      { name: "林益銓", honorific: "先生" },
      { name: "黃雨程", honorific: "女士" },
      { name: "彭沛華", honorific: "先生" },
      { name: "陳嘉慧", honorific: "女士" },
      { name: "尹子健", honorific: "先生" },
      { name: "劉藴瑩", honorific: "女士" },
    ],
  },
  {
    title: "秘書處",
    members: [
      { role: "秘書長", name: "陳仁杰", honorific: "先生" },
      { role: "常務副秘書長", name: "施莹", honorific: "女士" },
      { role: "常務副秘書長", name: "趙偉", honorific: "先生" },
      { role: "常務副秘書長", name: "梁駿軒", honorific: "先生" },
      { role: "副秘書長", name: "王珍妮", honorific: "女士" },
      { role: "副秘書長", name: "李凱明", honorific: "先生" },
      { role: "副秘書長", name: "陳奕羲", honorific: "先生" },
      { role: "副秘書長", name: "吳仕嘉", honorific: "先生" },
      { role: "副秘書長", name: "張智偉", honorific: "先生" },
      { role: "副秘書長", name: "陳榮滿", honorific: "先生" },
      { role: "副秘書長", name: "賴家杰", honorific: "先生" },
    ],
  },
  {
    title: "理事",
    note: "排名不分先後",
    members: [
      { name: "甘佩瀅", honorific: "女士" },
      { name: "朱健中", honorific: "先生" },
      { name: "吳本強", honorific: "先生" },
      { name: "李文傑", honorific: "先生" },
      { name: "林駿諺", honorific: "先生" },
      { name: "徐曉婕", honorific: "女士" },
      { name: "馬志恆", honorific: "先生" },
      { name: "梁維展", honorific: "先生" },
      { name: "陳兆聰", honorific: "先生" },
      { name: "陳梓俊", honorific: "先生" },
      { name: "陳韻娜", honorific: "女士" },
      { name: "湯穎琪", honorific: "女士" },
      { name: "華亦男", honorific: "女士" },
      { name: "楊晉榮", honorific: "先生" },
      { name: "葉綉文", honorific: "女士" },
      { name: "虞千慧", honorific: "女士" },
      { name: "劉尚儀", honorific: "女士" },
      { name: "劉偉玉", honorific: "女士" },
      { name: "歐天賜", honorific: "先生" },
      { name: "羅愛詩", honorific: "女士" },
      { name: "單錦然", honorific: "女士" },
      { name: "陳榮堅", honorific: "先生" },
      { name: "林曉容", honorific: "女士" },
      { name: "張岱鼎", honorific: "先生" },
      { name: "袁駿偉", honorific: "先生" },
      { name: "陳文靖", honorific: "女士" },
      { name: "郭家楊", honorific: "先生" },
      { name: "徐學賢", honorific: "先生" },
      { name: "梁佩清", honorific: "女士" },
    ],
  },
];
