'use client';

/**
 * BentoGrid.tsx
 * ──────────────────────────────────────────────────────────
 * 网格容器组件，负责：
 *   1. 非对称 CSS Grid 布局（3列 × 自动行）
 *   2. 编排子卡片的 stagger 入场动画
 *   3. 响应式断点处理（移动端退化为单列）
 *
 * 布局结构（桌面端）：
 *   ┌──────────────────────┬──────────────┐
 *   │   WutZit Hero        │  AI Tools    │
 *   │   (col-span-2        ├──────────────┤
 *   │    row-span-2)       │ AI Workflows │
 *   ├──────────────────────┴──────────────┤
 *   │         Insights (col-span-3)       │
 *   └─────────────────────────────────────┘
 */

import { motion, type Variants } from 'framer-motion';
import { BentoCard } from './BentoCard';
import type { BentoItem } from '../data/bento-items';

// staggerChildren 编排各卡片依次入场
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

interface BentoGridProps {
  items: BentoItem[];
}

export function BentoGrid({ items }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      /**
       * CSS Grid 规格：
       *   - 3 列等宽
       *   - 行高自适应内容（auto），最小 160px
       *   - gap 20px（符合 16-24px 规格要求）
       */
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ gap: '20px', gridAutoRows: 'minmax(200px, auto)' }}
    >
      {items.map((item) => (
        <BentoCard key={item.id} item={item} />
      ))}
    </motion.div>
  );
}
