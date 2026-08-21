export type OrgMember = {
  name: string;
  role?: string;
};

export type OrgGroup = {
  title: string;
  note?: string;
  members: OrgMember[];
};

export type OrgCommittee = {
  title: string;
  convener: OrgMember;
  deputyConveners: OrgMember[];
};

export const organizationTitle = "香港青年會 第十五屆理監事會架構";
export const organizationTerm = "任期至2028年5月15日";

export const organizationGroups: OrgGroup[] = [
  {
    title: "永遠榮譽會長",
    members: [
      { name: "孫啟昌" },
      { name: "姜玉堆" },
      { name: "聶毅" },
      { name: "葉振都" },
      { name: "饒桂珠" },
      { name: "莊創業" },
      { name: "岑濬" },
      { name: "鄭承峰" },
      { name: "施明耀" },
      { name: "陳凱榮" },
      { name: "鍾奇峰" },
    ],
  },
  {
    title: "會長",
    members: [
      { name: "何緯豐" },
      { name: "何存恩" },
    ],
  },
  {
    title: "副會長",
    members: [{ name: "林志昆" }, { name: "謝凰姿" }],
  },
  {
    title: "監事會",
    members: [
      { role: "監事長", name: "劉粵儀" },
      { role: "副監事長", name: "劉玉榮" },
    ],
  },
  {
    title: "主席團",
    members: [
      { role: "主席", name: "鄭翰衍" },
      { role: "常務副主席", name: "辛子豪" },
      { role: "副主席", name: "楊淇煜" },
      { role: "副主席", name: "馮英傑" },
      { role: "副主席", name: "吳奕林" },
      { role: "副主席", name: "陳仁杰" },
      { role: "副主席", name: "彭沛華" },
      { role: "副主席", name: "陳兆聰" },
      { role: "副主席", name: "陳湘洳" },
    ],
  },
  {
    title: "秘書處",
    members: [
      { role: "秘書長", name: "李嘉軒" },
      { role: "常務副秘書長", name: "施莹" },
      { role: "常務副秘書長", name: "趙偉" },
      { role: "常務副秘書長", name: "黃雨程" },
      { role: "常務副秘書長", name: "陳榮堅" },
      { role: "副秘書長", name: "梁佩清" },
      { role: "副秘書長", name: "單錦然" },
      { role: "副秘書長", name: "鄧仿淇" },
    ],
    note: "副秘書長按姓氏筆畫排序",
  },
  {
    title: "司庫",
    members: [{ name: "施莹" }],
  },
  {
    title: "義務法律顧問",
    members: [
      { name: "陳仁杰" },
      { name: "林子右" },
      { name: "鄧仿淇" },
    ],
  },
  {
    title: "義務核數師",
    members: [{ name: "何庭康" }],
  },
  {
    title: "常務理事",
    note: "按姓氏筆畫排序",
    members: [
      { name: "尹子健" },
      { name: "李長源" },
      { name: "林子右" },
      { name: "林益銓" },
      { name: "梁佩清" },
      { name: "單錦然" },
      { name: "黃仲謙" },
      { name: "鄧仿淇" },
    ],
  },
  {
    title: "理事",
    note: "按姓氏筆畫排序",
    members: [
      { name: "王珍妮" },
      { name: "朱健中" },
      { name: "李志林" },
      { name: "吳本強" },
      { name: "吳紹麟" },
      { name: "林駿諺" },
      { name: "周穗婷" },
      { name: "柘泰宇" },
      { name: "徐曉婕" },
      { name: "徐學賢" },
      { name: "郭家楊" },
      { name: "張岱鼎" },
      { name: "華亦男" },
      { name: "陳梓俊" },
      { name: "陳靖" },
      { name: "陳韻娜" },
      { name: "程浩翔" },
      { name: "楊洋" },
      { name: "雷添偉" },
      { name: "蔡騏駿" },
      { name: "劉偉玉" },
    ],
  },
];

export const organizationCommittees: OrgCommittee[] = [
  {
    title: "會務委員會",
    convener: { name: "陳湘洳" },
    deputyConveners: [
      { name: "施莹" },
      { name: "黃仲謙" },
    ],
  },
  {
    title: "體育活動委員會",
    convener: { name: "陳兆聰" },
    deputyConveners: [{ name: "鄧仿淇" }],
  },
  {
    title: "社會事務委員會",
    convener: { name: "馮英傑" },
    deputyConveners: [
      { name: "黃雨程" },
      { name: "陳梓俊" },
    ],
  },
  {
    title: "文藝活動委員會",
    convener: { name: "楊淇煜" },
    deputyConveners: [{ name: "梁佩清" }],
  },
  {
    title: "內地事務委員會",
    convener: { name: "彭沛華" },
    deputyConveners: [{ name: "林益銓" }],
  },
  {
    title: "就業創業委員會",
    convener: { name: "吳奕林" },
    deputyConveners: [
      { name: "趙偉" },
      { name: "尹子健" },
    ],
  },
  {
    title: "公共關係與傳訊委員會",
    convener: { name: "辛子豪" },
    deputyConveners: [{ name: "李長源" }],
  },
  {
    title: "青雋委員會",
    convener: { name: "陳仁杰" },
    deputyConveners: [
      { name: "陳榮堅" },
      { name: "單錦然" },
    ],
  },
];
