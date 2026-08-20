import type { Article } from "@/lib/data/updates";

function numbered(dir: string, count: number, ext: string) {
  return Array.from(
    { length: count },
    (_, index) => `${dir}/${String(index + 1).padStart(2, "0")}${ext}`,
  );
}

export const newsletters: Article[] = [
  {
    slug: "mountain-run-2025-report",
    title: "躍動青年山嶺跑 賀中華人民共和國成立76周年",
    date: "2025-09-23",
    excerpt:
      "為慶祝中華人民共和國成立76周年暨香港青年會成立三十周年，本會於9月20日在太平山山頂廣場舉行第三屆躍動山嶺國慶跑2025。",
    image: "/images/home/thumb-run-2025.jpg",
    gallery: numbered("/images/updates/run-2025-report", 8, ".png"),
    body: [
      "為慶祝中華人民共和國成立76周年暨香港青年會成立三十周年，香港青年會於9月20日在香港島太平山山頂廣場舉行了第三屆躍動山嶺國慶跑2025活動。此次活動是民政及青年事務局「青年節@HK」伙伴活動、第十四屆中西區體育節支持活動，以及香港青年會三十周年重點慶祝活動。除了青年越野跑賽事，現場更設共融盃以支持弱勢社群以及政府部門盃邀請各紀律部隊同場競技。",
      "當日主禮嘉賓有中央人民政府駐香港特別行政區聯絡辦公室港島工作部副部長楊成偉先生、民政及青年事務局青年專員陳瑞緯先生、香港警務處西區警區指揮官葉嘉儀總警司、香港警務處中區指揮官林穎濠署理總警司、中國香港足球總會會長及中國香港群眾體育聯會會長貝鈞奇先生 S.B.S., M.H.、第十四屆中西區體育節統籌委員會執行主席林振風先生 M.H.、中國電信國際有限公司總經理尹進先生、民銀資本控股有限公司副總經理郭基智先生、中西區區議員張宗先生、上海浦東發展銀行香港分行行長賈紅睿先生等親臨出席，參與開幕及鳴槍儀式。現場超過六百名青年及市民熱情參與，氣氛高漲。民銀資本控股有限公司副總經理郭基智先生指出：作為本次國慶活動的贊助方，我們感受到香港不同年齡群體的蓬勃活力。關愛共融是社區核心議題，這次活動充分彰顯社會各界齊心協力，共同推動包容發展。",
      "香港青年會主席鍾奇峰致辭時強調：值此中華人民共和國成立76周年之際，香港青年會發起並聯同各界舉辦躍動山嶺國慶跑2025活動，感謝社會機構的踴躍響應與投入。活動特設「慈善共融跑」環節，讓精神康復者、殘障人士及基層家庭成員一同加入，體現社會的溫暖與包容。感謝民青局對活動的鼎力支持，以及特區政府對青年關懷的重視。青年們積極投身其中，踐行全民健身理念，充分展現香港青年對體育的熱忱，以此方式向祖國獻上祝福。縱使天氣未如理想，一眾跑手風雨同路，更加印證香港年青人的魄力。",
      "本次活動的合辦機構：香港島青年聯會。",
      "本次活動的支持機構包括：第十四屆中西區體育節統籌委員會、香港體育社團聯會、香港島校長聯會、香港區家長教師會聯會、張宗區議員辦公室、中國電信國際有限公司、香港中國企業協會青年委員會、匡智會、善導會、香港傷健共融網絡、大埔無人機足球會、首援智訓、碳中和協會。",
      "本次活動的禮品贊助機構包括：華潤飲料控股有限公司、Active Brands Asia Limited、威威香港、澳洲亮麗清潔用品、Smecta、費森尤斯卡比香港有限公司、Escapade Sports HK、UNPAVED。合作跑會：R33跑會。",
      "活動相片：https://www.dropbox.com/scl/fo/kq9x3h3osm2cass7yuq3b/AP0Ur6-zy_J4oc_8mVoxFk0?rlkey=k7ovpzglrk814pa0cby4484ya&st=4ao6smkj&dl=0",
      "https://drive.google.com/drive/folders/1CN92_TfUMqfcaCKMqYOH7ijYO3P9Pgpl",
      "如有任何查詢請發電郵到 info@youth.org.hk 或致電 96242911 馮先生。",
    ],
  },
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
  {
    slug: "national-day-2023",
    title: "香港青年會祝國家昌盛，家庭幸福，人圓家圓國圓！",
    date: "2023-09-29",
    excerpt: "香港青年會祝國家昌盛，家庭幸福，人圓家圓國圓！",
    image: "/images/updates/new-year.jpg",
    body: [],
  },
  {
    slug: "mountain-run-2023",
    title: "躍動山嶺國慶跑",
    date: "2023-09-25",
    excerpt:
      "呢個比賽背後的義意為推動社會共融理念，屆時將會邀請傷健運動員一齊參與，亦會邀請於各大慈善團體受助人士參與義工服務。",
    image: "/images/updates/national-day-run.jpg",
    gallery: ["/images/updates/run-2023-2.jpg"],
    body: [
      "今年國慶前夕有咩節目？太平山頂大家一定非常熟識，不過大家有冇諗過原來係太平山頂行山都可以好有挑戰性呢？今年9月30日將會於太平山頂舉行「躍動山嶺國慶跑」，本次活動由Heartbeat Adventures聯同Blue Mountain Sports主辦、香港青年會及無疆界體育學院合辦嘅越野跑比賽。呢個比賽背後的義意為推動社會共融理念，屆時將會邀請傷健運動員一齊參與，亦會邀請於各大慈善團體受助人士參與義工服務，從而發互助精神！",
      "本次比賽分別有20公里的「挑戰組」（報名費：$380）同6公里的「樂融組」（報名費：$280），想挑戰一下自己可以參加「挑戰組」，想輕輕鬆鬆感受一下比賽嘅氣氛可以參加「樂融組」，一邊跑一邊欣賞維港靚景！",
      "比賽詳情及報名請立即點選：https://bluemountainsports.hk/躍動山嶺國慶跑/",
      "報名時請填寫優惠碼 HBAHKYA2023 以獲取港幣150元之VIP報名費折扣（即20公里挑戰賽報名費用為港幣230元；6公里樂融組賽報名費用為港幣130元；合共名額200人）。",
    ],
  },
];

export function getNewsletter(slug: string) {
  return newsletters.find((item) => item.slug === slug);
}
