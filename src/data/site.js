/**
 * site.js —— 全站内容都放在这里
 * 改文案、换项目、加图片，只需要动这个文件，不用碰组件。
 * 所有数据均来自简历 / VIS 手册 / 河北文创长图 / 动画成片。
 */

import { asset } from "../lib/asset.js";

export const me = {
  name: "石超",
  nameEn: "SHI CHAO",
  role: "新媒体设计师 视觉与内容",
  school: "石家庄职业技术学院 软件工程系",
  major: "大数据技术（新媒体设计）",
  period: "2024.09 — 至今",
  degree: "应届专科",
  city: "石家庄 可接受异地",
  phone: "19031436153",
  email: "2047459610@qq.com",
  wechat: "19031436153",
  born: "2004.10",
};

/* 首屏：居中排版 + 整幅视频带 */
export const hero = {
  eyebrow: "应届 新媒体设计 视觉与内容",
  /* 标题分三段：第一行 / 第二行前半（常规） / 第二行后半（衬线 + 主色） */
  titleTop: "以视觉为媒介",
  titleBottom: "用设计",
  titleDim: "传递表达",
  tags: ["品牌 VIS", "文创视觉", "版式海报", "二维动画", "短视频剪辑", "AIGC 评测"],
  ctaPrimary: { label: "看精选作品", href: "#works" },
  ctaSecondary: { label: "联系我", href: "#contact" },
  /* 底部三格数据：挑简历里最硬的三个结果 */
  heroStats: [
    { icon: "spark", value: "255", unit: "条", label: "AI 视频质量评测" },
    { icon: "grid", value: "37", unit: "页", label: "VIS 品牌手册输出" },
    { icon: "check", value: "0", unit: "返修", label: "动画镜头一次过审" },
  ],
  toolkit: [
    "剪映",
    "Premiere",
    "After Effects",
    "Photoshop",
    "Illustrator",
    "Animate",
    "CorelDRAW",
  ],
  reel: {
    video: asset("/hero-loop.mp4"),
    poster: asset("/showreel-poster.webp"),
    label: "SHOWREEL 作品片花",
    note: "静音循环",
  },
};

/* 数据（全部来自简历真实结果） */
export const stats = [
  { value: "255", unit: "条", label: "AI 视频质量评测" },
  { value: "95", unit: "%", label: "试标一致率（原 70%）" },
  { value: "37", unit: "页", label: "VIS 品牌规范输出" },
  { value: "0", unit: "返修", label: "动画镜头一次过审" },
];

export const about = [
  "我是石超，应届毕业生，就读于石家庄职业技术学院软件工程系，专业是大数据技术（新媒体设计方向）。三年下来一半学数据、一半学设计，最后把重心放在视觉与内容这条路上。",
  "能独立交付的范围比较明确：品牌 VIS 的规范梳理与成稿、海报与版式、文创与长图信息设计、二维动画的镜头制作、短视频剪辑与包装。PS / AI / AN / Pr / AE / 剪映 / CorelDRAW 都是我自己跑通的流程，中间不用等人转格式。",
  "在校期间做完了几件拿得出手的事：独立完成《兰亭宴》37 页品牌视觉手册，做完一整套燕赵文创系列长图，参与《神医奶爸》第二季第 51 集第 3 镜头的全流程制作；也在 Leo 大模型后训练项目里累计做过 255 条视频质量评测。",
  "现在在找新媒体设计、品牌视觉、版式与内容制作方向的校招或实习岗位。工作习惯是：拿到需求先拆成步骤再动手，交出去之前先按甲方和评测的标准把自己筛一遍。",
];

/* 个人经历模块里的「作品内容」——一眼看到我能交付什么 */
export const capabilities = [
  { label: "二维动画 镜头制作", note: "原画 → 关键帧 → 渲染", href: "#work-shenyi" },
  { label: "品牌 VIS 视觉规范", note: "37 页基础与应用系统", href: "#work-vis" },
  { label: "文创 海报 版式", note: "系列平面与长图信息设计", href: "#work-hebei" },
  { label: "短视频剪辑 包装", note: "卡点 花字 字幕 转场", href: "#works" },
  { label: "AIGC 素材质检", note: "五维打分 缺陷归因", href: "#work-leo" },
];

export const timeline = [
  {
    time: "2026.09 — 2026.10",
    title: "文生图与视频标注 Leo 大模型后训练项目",
    org: "AI 视频质量评测",
    desc: "按五维口径累计完成约 255 条视频标注，日均有效产出 12 条；试标一致率由 70% 提升至 95%，标注完整率 100%。",
  },
  {
    time: "2026.04 — 2026.05",
    title: "VIS 品牌视觉传达手册 独立完成",
    org: "《兰亭宴》中式餐厅",
    desc: "独立完成品牌基础视觉要素规范、标准字体、配色体系、图形纹样与版式排版，输出 37 页可直接执行的规范文档。",
  },
  {
    time: "2026.03 — 2026.04",
    title: "《神医奶爸第二季》第 51 集 第 3 镜头",
    org: "昵昵传媒 沙雕动画",
    desc: "镜头原画绘制、动作关键帧调节、场景素材优化与画面节奏把控，配合团队完成镜头衔接与渲染输出，一次过审无返修。",
  },
  {
    time: "2024.09 — 至今",
    title: "石家庄职业技术学院 软件工程系",
    org: "大数据技术（新媒体设计）",
    desc: "主修平面创意设计、品牌与形象设计、新媒体营销与视频剪辑、美学创意技术、微场景设计与制作。",
  },
];

/**
 * 精选作品
 * media.type: "video" | "image" | "data"
 */
export const works = [
  {
    id: "shenyi",
    index: "01",
    title: "《神医奶爸》第二季",
    subtitle: "第 51 集 第 3 镜头 全流程制作",
    category: "沙雕动画 镜头制作",
    year: "2026.03 — 2026.04",
    role: "原画 关键帧 渲染输出",
    tools: "Adobe Animate / 剪映",
    desc:
      "从原画到成片的单镜头全流程：动作关键帧逐帧调节，场景素材按项目美术风格统一，节奏对齐脚本要求，最后配合团队完成镜头衔接与渲染输出。",
    metric: "一次过审 0 返修",
    media: {
      type: "video",
      /* src = 完整成片（点「播放成片」才加载）；loopSrc = 卡片里循环的 4 秒小片 */
      src: asset("/showreel.mp4"),
      loopSrc: asset("/shenyi-loop.mp4"),
      poster: asset("/showreel-poster.webp"),
      ratio: "16 / 9",
      caption: "循环片段 4 秒　完整成片 21 秒",
    },
    highlights: [
      "原画绘制：角色、道具与场景素材按项目风格统一",
      "关键帧：动作节奏逐帧调节，口型与表情对齐脚本",
      "输出：配合团队完成镜头衔接、动态微调与渲染",
    ],
    accent: "amber",
  },
  {
    id: "vis",
    index: "02",
    title: "《兰亭宴》VIS 品牌视觉手册",
    subtitle: "中式餐厅 37 页视觉识别系统 独立完成",
    category: "品牌视觉 版式规范",
    year: "2026.04 — 2026.05",
    role: "品牌梳理 全套规范设计",
    tools: "Photoshop / Illustrator",
    desc:
      "把一个「新中式餐厅」的定位，拆成可执行的视觉系统：标志与组合规范、中英文字体、主辅色与色阶、辅助图形排列，一直做到门头、菜单、文创与礼盒的应用延展。",
    metric: "37 页 可直接执行",
    media: {
      type: "image",
      src: asset("/vis/cover.jpg"),
      ratio: "4 / 3",
      caption: "手册封面 兰亭宴 VIS",
    },
    gallery: [
      { src: asset("/vis/merch.jpg"), label: "文创产品" },
      { src: asset("/vis/ip.jpg"), label: "IP 形象 兰小鹤" },
      { src: asset("/vis/storefront.jpg"), label: "门头应用" },
    ],
    /* 手册原件：放在卡片下方，点开就是完整的 37 页 PDF */
    links: [
      {
        label: "完整《兰亭宴》VIS 手册 37 页",
        meta: "PDF 8.4 MB 新窗口打开",
        href: asset("/vis/lantingyan-vis.pdf"),
      },
    ],
    highlights: [
      "基础系统：标志、标准字、色彩、辅助图形的完整规范",
      "应用系统：门头 / 菜单 / 餐具 / 文创 / 礼盒 / 服装 / 车体",
      "版式：37 页统一栅格，说明文字与图示分区固定",
    ],
    accent: "crimson",
  },
  {
    id: "hebei",
    index: "03",
    title: "燕赵文创 河北有礼",
    subtitle: "河北非遗文创系列 五组长图",
    category: "文创视觉 长图信息设计",
    year: "2026",
    role: "主题梳理 系列版式 配色",
    tools: "Photoshop / Illustrator",
    desc:
      "从燕赵非遗里挑出磁州窑、蔚县剪纸、唐山皮影、定瓷与赵州桥，先梳理纹样和配色，再落成五组讲得清用途的文创：实用器、工艺摆件、剪纸、立体仿生与运动周边。一张长图按五个系列分区，每组都标了适用场景、工艺与配色。",
    metric: "5 大系列 单张长图",
    media: {
      type: "image",
      src: asset("/work-hebei.webp"),
      ratio: "1 / 3.34",
      position: "top",
      pan: true,
      caption: "长图作品 燕赵文创 河北有礼",
    },
    highlights: [
      "实用类：磁州窑纹样 → 瓷绘文具、餐具与摆件，配色取自燕赵风骨",
      "非遗工艺：定瓷茶器、蔚县剪纸与唐山皮影摆件，按工艺分类落位",
      "立体仿生：赵州桥 → 桥形笔架，古祠飞檐 → 桌面摆件；另配运动文创周边",
    ],
    accent: "paper",
  },
  {
    id: "leo",
    index: "04",
    title: "AI 视频质量评测",
    subtitle: "Leo 大模型后训练项目 文生视频标注",
    category: "AIGC 数据标注",
    year: "2026.09 — 2026.10",
    role: "五维评测 缺陷归因",
    tools: "Tlabel 标注平台",
    desc:
      "对照参考图、提示词与生成视频，从五个维度打分、勾选缺陷代码并填写问题理由。多主体场景下把缺陷准确归因到对应主体，标注完整率 100%。",
    metric: "255 条 一致率 70% → 95%",
    media: { type: "data", ratio: "4 / 3" },
    facts: [
      { value: "255", unit: "条", label: "累计评测视频" },
      { value: "95", unit: "%", label: "试标一致率" },
      { value: "100", unit: "%", label: "标注完整率" },
      { value: "12", unit: "条/日", label: "日均有效产出" },
    ],
    dimensions: ["SC 参考一致性", "TA 文本遵循", "MQ 动态质量", "VQ 美学", "AV 音画"],
    highlights: [
      "SOP：红线判定 → 1–5 档落档 → 缺陷 code → 理由 → 无效剔除",
      "口径：五维全量覆盖，多主体场景逐主体归因",
    ],
    accent: "cool",
  },
];

/**
 * 海报与平面 —— 四张竖版海报
 * 换图：把新文件放进 public/posters/，命名 poster-01.jpg … poster-04.jpg 即可；
 * 没有文件时自动显示为「待补充」的空位，不会出现裂图。
 */
export const posters = [
  {
    id: "p1",
    index: "P1",
    title: "透视网格",
    note: "立体透视",
    image: asset("/posters/poster-01.jpg"),
  },
  {
    id: "p2",
    index: "P2",
    title: "路径文字",
    note: "路径绕排",
    image: asset("/posters/poster-02.jpg"),
  },
  {
    id: "p3",
    index: "P3",
    title: "充电",
    note: "混合轴 字体",
    image: asset("/posters/poster-03.jpg"),
  },
  {
    id: "p4",
    index: "P4",
    title: "绿色出行",
    note: "扁平插画",
    image: asset("/posters/poster-04.jpg"),
  },
];

export const strengths = [
  {
    index: "01",
    title: "全流程独立交付",
    desc:
      "原画 → 关键帧 → 剪辑包装 → 渲染输出，一个镜头不假手于人。品牌视觉也一样：从定位、规范到 37 页成稿，一个人闭环。",
    tags: ["AN", "Pr", "剪映"],
  },
  {
    index: "02",
    title: "懂 AI 素材的评价口径",
    desc:
      "按大模型后训练的评分标准看片子：参考一致性、文本遵循、动态质量、美学、音画。出片前先按同一套标准自检，交出去的废片率更低。",
    tags: ["五维评测", "缺陷归因"],
  },
  {
    index: "03",
    title: "有成片上线数据",
    desc:
      "参与制作的沙雕动画正片已在抖音、快手等平台上线。不是课程作业，是要接受真实播放检验的片子。",
    tags: ["抖音", "快手"],
  },
  {
    index: "04",
    title: "把模糊需求拆成流程",
    desc:
      "评测拆成「红线 → 落档 → 缺陷归因 → 理由 → 剔除」，视觉拆成「规范 → 版式 → 出稿 → 自检」。拿到需求先定步骤，再动手。",
    tags: ["SOP", "流程化"],
  },
  {
    index: "05",
    title: "交付前逐条自检",
    desc:
      "动画镜头一次过审、零返修。习惯在交出去之前先当一次甲方，把能被挑出来的问题自己挑掉。",
    tags: ["0 返修", "质检"],
  },
  {
    index: "06",
    title: "工具链够宽",
    desc:
      "PS / AI / AN / Pr / AE / 剪映 / CorelDRAW 全链路打通，软件之间不用等别人转格式，也不需要在风格上做妥协。",
    tags: ["PS", "AI", "AE"],
  },
];

export const navItems = [
  { index: "01", label: "个人介绍", href: "#profile" },
  { index: "02", label: "精选作品", href: "#works" },
  { index: "03", label: "个人优势", href: "#strengths" },
  { index: "04", label: "联系方式", href: "#contact" },
];
