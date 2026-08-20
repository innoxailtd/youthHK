export type Partner = {
  name: string;
  category: "合辦" | "支持" | "贊助" | "友好";
};

export const partnersIntro =
  "本會與眾多中學、大學、社區團體、青年組織以及內地多個省市的青年團體建立友好關係，並共同舉辦有意義的活動。以下團體曾與本會結伴同行、合辦或支持會務。";

export const partners: Partner[] = [
  { name: "香港島青年聯會", category: "合辦" },
  { name: "民政及青年事務局", category: "支持" },
  { name: "第十四屆中西區體育節統籌委員會", category: "支持" },
  { name: "香港體育社團聯會", category: "支持" },
  { name: "香港島校長聯會", category: "支持" },
  { name: "香港區家長教師會聯會", category: "支持" },
  { name: "中國電信國際有限公司", category: "支持" },
  { name: "香港中國企業協會青年委員會", category: "支持" },
  { name: "匡智會", category: "支持" },
  { name: "善導會", category: "支持" },
  { name: "香港傷健共融網絡", category: "支持" },
  { name: "大埔無人機足球會", category: "支持" },
  { name: "首援智訓", category: "支持" },
  { name: "碳中和協會", category: "支持" },
  { name: "民銀資本控股有限公司", category: "贊助" },
  { name: "香港傑出學生協進會", category: "友好" },
  { name: "香港青年外交之友", category: "友好" },
];

export const partnerCategories = ["合辦", "支持", "贊助", "友好"] as const;
