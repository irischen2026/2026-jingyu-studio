/**
 * bento-items.ts
 * ──────────────────────────────────────────────────────────
 * 数据驱动核心：包含 5 个核心模块的配置
 */

export type VisualMode = 'pixel-hero' | 'gallery' | 'terminal' | 'typography' | 'blackhole';

export interface BentoItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  size: 'hero' | 'tall' | 'standard'; // 2x2, 1x2, 1x1
  iconName: string;
  status?: 'live' | 'wip' | 'archived';
  tags?: string[];
  visualMode: VisualMode;
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
