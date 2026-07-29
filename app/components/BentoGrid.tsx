'use client';

/**
 * BentoGrid.tsx
 * ──────────────────────────────────────────────────────────
 * 网格容器组件
 */

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { BentoCard } from './BentoCard';
import { ProjectModal } from './ProjectModal';
import { SpatialGalleryModal } from './SpatialGalleryModal';
import type { BentoItem, ProjectDetail } from '../data/bento-items';

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
  // 提升状态到 Grid 层，使得 Modal 能够跳出单个卡片的 overflow-hidden 束缚
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [selectedSpatialItem, setSelectedSpatialItem] = useState<BentoItem | null>(null);

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: '24px', gridAutoRows: 'minmax(280px, auto)' }}
      >
        {items.map((item) => (
          <BentoCard 
            key={item.id} 
            item={item} 
            onProjectClick={setSelectedProject}
            onCardClick={() => {
              if (item.id === 'spatial-design') {
                setSelectedSpatialItem(item);
              }
            }}
          />
        ))}
      </motion.div>

      {/* 全局模态框 (Core Engineering 内部项目) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* 全局模态框 (Spatial & Design 画廊) */}
      <AnimatePresence>
        {selectedSpatialItem && (
          <SpatialGalleryModal 
            item={selectedSpatialItem} 
            onClose={() => setSelectedSpatialItem(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
