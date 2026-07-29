'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { BentoItem, ProjectDetail, GalleryItem } from '../data/bento-items';

import { useState, useEffect } from 'react';

// --- 横向无边际画廊组件 (供 Core Engineering 使用) ---
function HorizontalCarousel({ projects, onProjectClick }: { projects: ProjectDetail[], onProjectClick?: (p: ProjectDetail) => void }) {
  // 为了防止大屏幕下轮播右侧出现空白，并确保无缝对接，我们将项目数组复制 12 次
  const marqueeProjects = Array(12).fill(projects).flat();
  const [isHovered, setIsHovered] = useState(false);

  // 动态计算动画时长：保证移动速度一致（假设每个项目移动需 6 秒）
  // 动画是移动总宽度的 50%，即移动 marqueeProjects.length / 2 个项目
  const moveItemsCount = marqueeProjects.length / 2;
  const animationDuration = `${moveItemsCount * 6}s`;

  return (
    <div 
      className="absolute inset-x-0 bottom-0 top-16 flex items-center overflow-hidden px-8"
      onClick={(e) => e.stopPropagation()} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-6 w-max animate-marquee"
        style={{ 
          animationPlayState: isHovered ? 'paused' : 'running',
          animationDuration: animationDuration
        }}
      >
        {marqueeProjects.map((proj, idx) => (
          <motion.div
            key={`${proj.id}-${idx}`}
            whileHover={{ scale: 1.03, zIndex: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            // 把卡片变宽变矮，给上方的标题留出空间
            className="relative shrink-0 w-[300px] md:w-[380px] h-[260px] md:h-[280px] rounded-3xl bg-[#0f0f11] border border-white/10 shadow-2xl overflow-hidden cursor-pointer group"
            onClick={() => onProjectClick && onProjectClick(proj)}
          >
            {proj.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                <span className="text-white/20 font-mono tracking-widest uppercase group-hover:text-white/40 transition-colors">No Cover</span>
              </div>
            )}
            
            {proj.isComingSoon && (
              <div className="absolute top-4 right-4 text-[10px] font-mono border border-white/20 px-3 py-1 rounded-full text-white/60 bg-black/50 backdrop-blur-md z-10">
                COMING SOON
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h3 className="text-white font-bold tracking-tight text-xl mb-1">{proj.title}</h3>
              {proj.description && (
                <p className="text-white/50 text-sm line-clamp-2">{proj.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// --- 背景自动轮播组件 (供 Spatial & Design 使用) ---
function AutoCarousel({ galleryItems }: { galleryItems: GalleryItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!galleryItems || galleryItems.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [galleryItems]);

  if (!galleryItems || galleryItems.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl z-0 pointer-events-none">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={galleryItems[currentIndex].images[0]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
    </div>
  );
}

// --- 主卡片组件 ---
export interface BentoCardProps {
  item: BentoItem;
  onProjectClick?: (p: ProjectDetail) => void;
  onCardClick?: () => void;
}

export function BentoCard({ item, onProjectClick, onCardClick }: BentoCardProps) {
  let spanClasses = '';
  let textSizeClass = '';
  
  switch (item.size) {
    case 'hero':
      spanClasses = 'md:col-span-2 md:row-span-2';
      textSizeClass = 'text-5xl md:text-7xl';
      break;
    case 'tall':
      spanClasses = 'md:row-span-2';
      textSizeClass = 'text-4xl md:text-5xl';
      break;
    default:
      spanClasses = 'md:col-span-1 md:row-span-1';
      textSizeClass = 'text-2xl md:text-3xl';
  }

  const isHero = item.id === 'core-engineering';
  const isSpatial = item.id === 'spatial-design';

  // 将 hover 样式写入 variant，以便子组件能够监听到 "hover" 状态的触发
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 } 
    },
    hover: {
      scale: 0.98,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      // 使用 "hover" 字符串激活状态传递，而不是直接传样式对象
      whileHover={!isHero ? "hover" : undefined}
      onClick={onCardClick}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-3xl backdrop-blur-md group ${spanClasses} ${!isHero ? 'cursor-pointer border border-white/5 bg-white/5' : 'bg-transparent border border-white/10'}`}
      style={{
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* 标题 */}
      <h2 className={`font-bold tracking-tight text-white z-10 transition-opacity duration-300 
        ${isHero ? 'absolute top-6 left-8 text-3xl md:text-4xl' : textSizeClass}`
      }>
        {item.title}
      </h2>

      {/* 如果是 Core Engineering，渲染跑马灯滚动画廊 */}
      {isHero && item.projects && (
        <HorizontalCarousel projects={item.projects} onProjectClick={onProjectClick} />
      )}

      {/* 如果是 Spatial & Design，渲染自动轮播背景 */}
      {isSpatial && item.galleryItems && (
        <AutoCarousel galleryItems={item.galleryItems} />
      )}
    </motion.article>
  );
}
