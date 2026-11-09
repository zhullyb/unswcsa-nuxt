export const navItems = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于我们' },
  { path: '/team', label: '部门与团队' },
  { path: '/activities', label: '全部活动' },
  { path: '/join', label: '加入我们' },
] as const

export const socials = [
  { name: 'Instagram', qr: '/brand/social/Insta.png' },
  { name: '小红书', qr: '/brand/social/RedNot.png' },
  { name: '微信公众号', qr: '/brand/social/WeChat.png' },
  { name: '抖音', qr: '/brand/social/Tiktok.png' },
]

export const introText =
  '新南学联成立于 1992 年，陪伴一代代中国留学生走过在 UNSW 的学习与生活。从新生融入、学业与职业发展，到文化交流、体育活动与学生福祉，我们希望让每位同学都能找到参与的机会、同行的伙伴，以及属于自己的归属感。'

export const departments = [
  {
    name: '外联部',
    en: 'External Relations',
    description:
      '连接校外企业与品牌，为学联活动争取赞助与支持。从合作洽谈、方案沟通到物资对接与福利发放，外联部将外部资源转化为同学们看得见、用得到的支持，并主导推进「期末加油包」等项目。',
  },
  {
    name: '新媒体部',
    en: 'New Media',
    description:
      '负责学联活动宣传、社交平台运营与原创内容产出，将校园资讯和学联动态传递给同学们。从文案撰写、内容策划到排版编辑与合作商家宣传，新媒体部用创意与表达连接学联和校园生活。',
  },
  {
    name: '技术部',
    en: 'Technology',
    description:
      '以设计、影像和代码为学联提供幕后支持。部门设有平面、摄影、剪辑和 IT 四个小组，分别负责海报与物料设计、活动摄影摄像、视频制作，以及小程序和网站的开发运维，让创意落地，让精彩留存。',
  },
  {
    name: '策划部',
    en: 'Events',
    description:
      '从创意构思、方案撰写到现场执行与活动复盘，策划部共同完成校园社交活动的全过程。通过迎新派对、徒步、树洞音乐会、校园夜市和周常桌游等多样活动，为同学们创造轻松相识、交流与参与的机会。',
  },
  {
    name: '文体部',
    en: 'Culture & Sports',
    description:
      '策划并举办文化、艺术、体育与电竞活动，将传统节庆和共同兴趣带入校园生活。从端午游园会、歌手比赛到足球赛事与电竞活动，文体部通过前期策划、跨部门协作和现场执行，让每一份热爱都有相聚的舞台。',
  },
  {
    name: '职规部',
    en: 'Career Development',
    description:
      '连接校园与职场，通过朋辈分享、行业交流与商业案例竞赛，帮助同学探索职业方向、提升职业素养。部门设有策划组、宣传组和周报组，分别推进职业活动与嘉宾联络、宣传物料制作，以及实习机会和企业合作资源的拓展。',
  },
]

export const honors: [number, string][] = [
  [2024, '年度最佳社团奖'],
  [2024, '校园世界杯足球赛冠军'],
  [2024, '校园世界杯排球赛冠军'],
  [2025, '年度卓越传播奖'],
  [2025, '年度最佳大型活动奖'],
  [2025, '年度最佳团队奖'],
  [2025, '年度学生社区影响大奖'],
  [2025, '年度文化影响力社团大奖'],
  [2025, '社团卓越纪念奖'],
  [2026, '校园世界杯足球赛冠军'],
  [2026, '跨校世界杯足球赛冠军'],
]

export const featuredHonors = honors.filter((_, i) => [0, 4, 5, 6].includes(i))

export const missions = [
  {
    title: '陪伴新生融入',
    text: '从国内行前交流、新生社群，到 O-Week、校园导览与迎新活动，帮助同学了解校园、结识伙伴，逐步建立自己的留学生活。',
  },
  {
    title: '支持学业与职业发展',
    text: '通过朋辈互助、选课经验分享、简历与面试交流、行业对话和企业参访，连接学习经验与职业探索的机会。',
  },
  {
    title: '连接文化与校园生活',
    text: '以传统节庆、音乐、体育、桌游和兴趣交流，让不同专业、年级与兴趣的同学找到自己的参与方式。',
  },
  {
    title: '关注学生福祉',
    text: '开展安全教育、健康与学业支持信息分享及考试季支持，帮助同学了解并连接学校的专业服务资源。',
  },
]

export const history = [
  { year: '1992', text: '新南学联成立，开始陪伴中国留学生的学习与校园生活。' },
  { year: '2024', text: '推出学联会员卡，探索将合作资源转化为学生日常生活中的支持。' },
  { year: '2025', text: '启用全新 Logo，推出原创吉祥物「新南威尔狮」。' },
  { year: '2026', text: '推出「新南威尔狮」系列原创表情包，进一步将学联形象融入校园日常。' },
]

export const reasons = [
  { title: '把想法变成现实', text: '参与策划、设计、传播、协调与现场执行，在真实项目中积累经验。' },
  { title: '找到同行的伙伴', text: '在共同协作和服务同学的过程中认识朋友，建立校园里的连接与归属。' },
  { title: '拓展视野与经历', text: '通过学联的行业交流、校友分享与跨校合作，接触不同领域的经验。' },
  { title: '让经验继续传承', text: '在团队工作中学习，也把实践中的方法与收获留给下一届成员。' },
]

const roles = [
  '主席', '副主席', '副主席', '秘书长', '财务', 'Arc Delegate',
  '外联部部长', '新媒体部部长', '技术部部长', '策划部部长', '文体部部长', '职规部部长',
]

export const teams = [
  {
    year: '2026',
    term: '2025/2026',
    names: ['Ada Choi', 'Kimmie Zhou', 'Esther Li', 'Devin Ma', 'Serena Chen', 'Angie Liu', 'Chrissy Liu', 'Ellier Ou', 'Sky Fan', 'Joanne Su', 'Vik Qin', 'Felcia Li'],
  },
  {
    year: '2025',
    term: '2024/2025',
    names: ['Ada Choi', 'Irene Xu', 'Chloe Tsoi', 'Jacqueline Huang', 'Esther Yu', 'Kimmie Zhou', 'Selena Qin', 'Selina Kong', 'Zoe Xu', 'Joanne Su', 'Fran Liao', 'Esther Li'],
  },
].map((t) => ({
  ...t,
  members: t.names.map((name, i) => ({
    name,
    role: roles[i]!,
    photo: `/images/team-${t.year}/${name.startsWith('Esther ') ? name.replace(' ', '-') : name.split(' ')[0]}.webp`,
  })),
}))

export const steps = [
  { title: '关注招新通知', description: '我们通常会在每学期开始前通过微信公众号发布招新推文，介绍当期开放部门、报名时间和申请方式。' },
  { title: '填写报名表', description: '阅读当期招新推文，了解各部门后，按文中的指引填写并提交报名表，留意后续面试通知。' },
  { title: '参加面试', description: '按照通知参加面试。面试通过后，即可加入新南学联，与我们一起参与校园活动和团队工作。' },
]

export const faqs = [
  { question: '什么时候可以申请？', answer: '招新一般在学期初进行，相关推文通常会在开学前发布。欢迎关注新南学联微信公众号，及时获取招新消息；具体报名时间与截止日期以当期推文为准。' },
  { question: '有哪些部门开放招新？', answer: '通常外联部、新媒体部、技术部、策划部、文体部和职规部六个部门都会招新。各部门的开放情况与招新安排可能有所调整，请以当期招新推文为准。' },
  { question: '如何提交申请？', answer: '在当期招新推文中找到报名表链接或二维码，按要求填写并提交表格即可完成报名。提交后请留意后续面试通知，面试通过后即可加入。' },
]
