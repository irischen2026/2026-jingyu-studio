/**
 * bento-items.ts
 * ──────────────────────────────────────────────────────────
 * 数据驱动核心：包含 5 个核心模块的配置及 Core Engineering 的内嵌项目数据
 */

export type VisualMode = 'pixel-hero' | 'gallery' | 'terminal' | 'typography' | 'blackhole';

export interface ProjectDetail {
  id: string;
  title: string;
  isComingSoon: boolean;
  image?: string; // 图片路径
  description?: string;
  workflow?: string[];
  workflowImage?: string; // 支持嵌入白板图片
  features?: string[];
  githubUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  year: string;
  category: string;
  images: string[];
  description?: string;
  videoUrl?: string;
  drawings?: string[];
  processFiles?: string[];
  groupPhotos?: string[];
  modelUrl?: string; // 预留模型展示 iframe 地址
}

export interface BentoItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  size: 'hero' | 'tall' | 'standard';
  iconName: string;
  status?: 'live' | 'wip' | 'archived';
  tags?: string[];
  visualMode: VisualMode;
  projects?: ProjectDetail[]; // 用于 Core Engineering 内部的叠牌画廊
  galleryItems?: GalleryItem[]; // 用于 Spatial & Design 的互动列表画廊
}

export const bentoItems: BentoItem[] = [
  {
    id: 'core-engineering',
    title: 'Core Engineering',
    subtitle: 'WutZit 1.0 & Interactive Apps',
    description: '完整开发项目、交互式商业应用，以及各种动画效果的高级实现。',
    size: 'hero',
    iconName: 'Wand2',
    status: 'live',
    tags: ['Next.js', 'Framer Motion', 'TypeScript'],
    visualMode: 'pixel-hero',
    projects: [
      {
        id: 'p1-wutzit',
        title: 'Code-To-Chinese',
        isComingSoon: false,
        image: '/project-cover.png', // 引用像素小人图片
        description: 'An AI tool that deconstructs abstract technical jargon and transforms it into intuitive, human-readable analogies.',
        workflowImage: '/workflow.png', // 引用白板图片
        features: ['Real-time Translation', 'Contextual Metaphors', 'Syntax Highlighting'],
        githubUrl: 'https://github.com/irischen2026/Code-To-Chinese/releases'
      },
      {
        id: 'p2-coming',
        title: 'COMING SOON',
        isComingSoon: true,
      }
    ]
  },
  {
    id: 'spatial-design',
    title: 'Spatial & Design',
    subtitle: 'Architecture & Morphology',
    description: '南老泉亭等传统建筑结构框架分析、上海老城厢里弄的形态学研究。',
    size: 'tall',
    iconName: 'PenTool',
    status: 'archived',
    tags: ['手绘图纸', '建筑结构'],
    visualMode: 'gallery',
    galleryItems: [
      {
        id: 'nanlao-spring',
        title: '难老泉亭重建设计',
        year: '2026',
        category: 'Rebuild the Eternal Youth Spring Gazebo',
        images: ['/assets/spatial/nanlao-spring/cover.png'],
        description: '难老泉亭概况： 难老泉亭位于太原晋祠内，泉名取自于《诗经》，泉水清澈长流。《山海经》载：“悬瓮之水，晋水出焉。”唐代李白赞曰：“晋祠流水如碧玉”，盛誉此泉。古人于水源处筑亭护泉。亭内泉池深约6米，石条垒筑，池周设木栏，可供凭栏赏泉。该亭形制异于江南园林，有明代北方园林亭阁特征。\n\n该亭始建于北齐天保年间（550—559年），明嘉靖年间（约1522—1566年）重建。该亭平面呈八卦八边形，高9m，面积约85㎡，面阔约4.2m，进深约4.8m；屋顶为八角攒尖顶，覆灰瓦，八条孔雀蓝琉璃垂脊汇集于宝瓶宝珠。檐柱有侧角和收分做法，屋檐下施三踩斗拱，柱头科每攒一攒，角科采用斜拱做法。平身科每间两攒，从大斗口水平伸出如意式昂头，上承厢拱。亭内梁架分上下两层，八根戗杆支撑垂莲悬柱，环绕一圈，中悬雷公柱，雕作龙头形。整体上，亭的间架结构保留北方亭式建筑的古朴风格，斗拱昂嘴的做法突显明代特点。',
        drawings: [
          '/assets/spatial/nanlao-spring/drawing-1.jpg',
          '/assets/spatial/nanlao-spring/drawing-2.png',
          '/assets/spatial/nanlao-spring/drawing-3.png',
          '/assets/spatial/nanlao-spring/drawing-4.jpg',
          '/assets/spatial/nanlao-spring/drawing-5.png',
          '/assets/spatial/nanlao-spring/drawing-6.png',
          '/assets/spatial/nanlao-spring/drawing-7.png'
        ],
      },
      {
        id: 'sdna-shanghai',
        title: 'SDNA-BtE of Shanghai',
        year: '2025',
        category: 'Road Analysis',
        images: ['/assets/spatial/sdna-shanghai/cover.png'], 
        description: '基于 SDNA 空间句法与网络分析模型的上海城市路网整合度研究。',
        drawings: [
          '/assets/spatial/sdna-shanghai/drawing-1.png',
          '/assets/spatial/sdna-shanghai/drawing-2.png',
          '/assets/spatial/sdna-shanghai/drawing-3.png',
          '/assets/spatial/sdna-shanghai/drawing-4.png'
        ],
      },
      {
        id: 'yishui',
        title: '黟水三阶',
        year: '2025',
        category: 'The Three Steps of Yishui water',
        images: ['/assets/spatial/yishui/cover.png'],
        description: '2025 Studio Rural Village\n\n此设计作为小组设计的系统中的一环，主要聚焦于取水。它涵盖一个对上游的人工湿地改造、对下游的生态公园改造，以及中部的地下建筑新建。\n\n课程位于安徽黟县的一处偏远村庄。一方面，原住民面临着取水困难的现实问题，在早期和村书记的交流中，我们得知需要一个水库。但是建设水库所需要的论证时间长，工程周期长，对地表破坏显著。另外，村庄的环境容量非常脆弱，不论是公共空间还是道路都急需扩容。\n\n另外，管网入户将水变为一种隐匿的、计量的商品，对于源溪村来说，这有悖于的生态和传统的伦理。因此设置集中取水的空间。建筑分为两层：地下二层是水泵和储水池；地下一层是集中的取水设施和公共空间，地下一层用楼梯间和电梯与地上连接。建筑不破坏地上风土建筑的面貌，同时，垂直交通部分成为地景的延续。',
        videoUrl: '/assets/spatial/yishui/video.mp4',
        drawings: [
          '/assets/spatial/yishui/drawing-1.jpg',
          '/assets/spatial/yishui/drawing-2.jpg',
          '/assets/spatial/yishui/drawing-3.png',
          '/assets/spatial/yishui/drawing-4.png'
        ],
        processFiles: [
          '/assets/spatial/yishui/process-1.png',
          '/assets/spatial/yishui/process-2.png',
          '/assets/spatial/yishui/process-3.png',
          '/assets/spatial/yishui/process-4.png',
          '/assets/spatial/yishui/process-5.png',
          '/assets/spatial/yishui/process-6.png',
          '/assets/spatial/yishui/process-7.png'
        ],
        groupPhotos: [
          '/assets/spatial/yishui/group-1.jpg',
          '/assets/spatial/yishui/group-2.jpg',
          '/assets/spatial/yishui/group-3.jpg',
          '/assets/spatial/yishui/group-4.jpg'
        ],
      },
      {
        id: 'ai-rendering',
        title: 'AI赋能渲染',
        year: '2024',
        category: 'AI-Empowered Rendering',
        images: ['/assets/spatial/ai-rendering/cover.png'],
        description: 'AI赋能渲染探索。',
        drawings: [
          '/assets/spatial/ai-rendering/drawing-1.png',
          '/assets/spatial/ai-rendering/drawing-2.png',
          '/assets/spatial/ai-rendering/drawing-3.png',
          '/assets/spatial/ai-rendering/drawing-4.jpg',
          '/assets/spatial/ai-rendering/drawing-5.jpg',
          '/assets/spatial/ai-rendering/drawing-6.jpg',
          '/assets/spatial/ai-rendering/drawing-7.jpg',
          '/assets/spatial/ai-rendering/drawing-8.jpg'
        ],
      },
      {
        id: 'taiyuan-urban',
        title: '太原钟鼓楼片区更新',
        year: '2023',
        category: 'Urban design of Taiyuan',
        images: ['/assets/spatial/taiyuan-urban/cover.png'],
        description: '太原钟鼓楼片区更新城市设计。',
        drawings: [
          '/assets/spatial/taiyuan-urban/drawing-1.jpg',
          '/assets/spatial/taiyuan-urban/drawing-2.png',
          '/assets/spatial/taiyuan-urban/drawing-3.png',
          '/assets/spatial/taiyuan-urban/drawing-4.png',
          '/assets/spatial/taiyuan-urban/drawing-5.png',
          '/assets/spatial/taiyuan-urban/drawing-6.png'
        ],
      },
      {
        id: 'residential-planning',
        title: '居住区规划设计',
        year: '2021',
        category: 'for our living',
        images: ['/assets/spatial/residential-planning/cover.jpg'],
        description: '居住区规划设计。',
        drawings: [
          '/assets/spatial/residential-planning/drawing-1.jpg',
          '/assets/spatial/residential-planning/drawing-2.png',
          '/assets/spatial/residential-planning/drawing-3.png',
          '/assets/spatial/residential-planning/drawing-4.png'
        ],
      },
      {
        id: 'public-building',
        title: '博物馆/图书馆设计',
        year: '2020',
        category: 'public building',
        images: ['/assets/spatial/public-building/cover.jpg'],
        description: '博物馆/图书馆设计。',
        drawings: [
          '/assets/spatial/public-building/drawing-1.jpg',
          '/assets/spatial/public-building/drawing-2.jpg',
          '/assets/spatial/public-building/drawing-3.jpg',
          '/assets/spatial/public-building/drawing-4.jpg'
        ],
      },
      {
        id: 'light-topology',
        title: '光影拓扑',
        year: '2019',
        category: 'Spatial Installation',
        images: ['/assets/spatial/light-topology/cover.png'],
        description: '探讨空间与自然光线的动态交互。',
        drawings: [
          '/assets/spatial/light-topology/drawing-1.png',
          '/assets/spatial/light-topology/drawing-2.png'
        ],
      }
    ]
  },
  {
    id: 'ai-labs',
    title: 'AI & RAG Labs',
    subtitle: 'Experiments & Prototypes',
    description: 'RAG 知识库搭建实验，各种 AI 辅助开发的小型 Demo。',
    size: 'standard',
    iconName: 'TerminalSquare',
    status: 'wip',
    tags: ['RAG', 'LLM', 'Python'],
    visualMode: 'terminal',
  },
  {
    id: 'product-insights',
    title: 'Product Insights',
    subtitle: 'Thinking & Delivery',
    description: '关于技术过渡、产品思维落地、技术与设计交叉领域的文章与复盘。',
    size: 'standard',
    iconName: 'Newspaper',
    status: 'live',
    tags: ['产品思维', '复盘'],
    visualMode: 'typography',
  },
  {
    id: 'blackhole',
    title: 'Blackhole',
    subtitle: 'Brainstorming',
    description: '无序的灵感碎片，发散的点子。',
    size: 'standard',
    iconName: 'Orbit',
    tags: ['Idea'],
    visualMode: 'blackhole',
  }
];
