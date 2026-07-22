'use client';

/**
 * BentoCard.tsx
 * ──────────────────────────────────────────────────────────
 * 极简玻璃拟态 (Glassmorphism) Bento 卡片组件
 * 
 * - 支持 3 种布局尺寸 (hero, tall, standard)
 * - 支持 5 种深度定制的内部视觉模式 (visualMode)
 */

import { motion, type Variants } from 'framer-motion';
import {
  Wand2,
  TerminalSquare,
  PenTool,
  Newspaper,
  Orbit,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { BentoItem } from '../data/bento-items';

const iconMap: Record<string, LucideIcon> = {
  Wand2,
  TerminalSquare,
  PenTool,
  Newspaper,
  Orbit,
  Zap,
};

// ─── Status Badge ─────────────────────────────────────────
function StatusBadge({ status }: { status: BentoItem['status'] }) {
  if (!status) return null;
  const label = status.toUpperCase();
  const isLive = status === 'live';
  
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold tracking-widest text-neutral-300"
      style={{ 
        background: 'rgba(255,255,255,0.05)', 
        border: '1px solid rgba(255,255,255,0.15)' 
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ 
          background: isLive ? '#fff' : 'rgba(255,255,255,0.5)', 
          boxShadow: isLive ? '0 0 8px rgba(255,255,255,0.8)' : 'none' 
        }}
      />
      {label}
    </span>
  );
}

// ─── Framer Motion Variants ───
const EASE_OUT_QUART = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT_QUART },
  },
};

const hoverStyle = {
  y: -4,
  backgroundColor: 'rgba(255,255,255,0.05)',
  borderColor: 'rgba(255,255,255,0.35)',
  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
};

// ─── Custom Visual Zones ──────────────────────────────────

function VisualPixelHero() {
  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl flex items-center justify-center min-h-[160px] bg-black/40 border border-white/10 p-4">
      <div className="flex flex-col items-center gap-4">
        {/* 像素风台球 5 号 */}
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden"
          style={{ boxShadow: '0 0 20px rgba(255,255,255,0.4)' }}
        >
          {/* 台球内部白圈 */}
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            {/* 像素字体 5 */}
            <span className="text-white font-mono font-bold text-xl leading-none" style={{ imageRendering: 'pixelated' }}>
              5
            </span>
          </div>
        </motion.div>
        
        {/* 打字机效果光标 */}
        <div className="font-mono text-sm tracking-widest text-neutral-300 flex items-center mt-4">
          <span className="mr-2">&gt; INIT_CORE_SYSTEM</span>
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            className="inline-block w-2 h-4 bg-white"
          />
        </div>
      </div>
    </div>
  );
}

function VisualGallery() {
  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl flex items-center justify-center min-h-[180px] mt-4">
      {/* 堆叠画廊 */}
      <motion.div 
        className="absolute w-3/4 h-3/4 bg-white/5 border border-white/20 rounded-xl backdrop-blur-sm -rotate-6 transform-origin-bottom-left"
        initial={{ rotate: -6 }}
        whileHover={{ rotate: -12, scale: 1.05 }}
        transition={{ type: 'spring' }}
      />
      <motion.div 
        className="absolute w-3/4 h-3/4 bg-white/10 border border-white/30 rounded-xl backdrop-blur-md flex items-center justify-center rotate-3 transform-origin-bottom-right"
        initial={{ rotate: 3 }}
        whileHover={{ rotate: 8, scale: 1.05 }}
        transition={{ type: 'spring' }}
      >
        <div className="w-8 h-8 border border-white/50 rounded-sm" />
      </motion.div>
    </div>
  );
}

function VisualTerminal() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black border border-neutral-800 p-4 font-mono text-[11px] leading-relaxed mt-4">
      <div className="flex gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-neutral-700" />
        <div className="w-2 h-2 rounded-full bg-neutral-700" />
        <div className="w-2 h-2 rounded-full bg-neutral-700" />
      </div>
      {/* 霓虹绿终端文字 */}
      <div className="text-[#39ff14] flex flex-col gap-1">
        <p>&gt; load_knowledge_base()</p>
        <p className="opacity-70">[OK] 10,242 vectors indexed</p>
        <p>&gt; query: "system_architecture"</p>
        <p className="opacity-70">Synthesizing...</p>
        <motion.div 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-1.5 h-3 bg-[#39ff14] mt-1"
        />
      </div>
    </div>
  );
}

function VisualTypography() {
  return (
    <div className="relative flex-1 flex flex-col justify-end mt-4 border-t border-white/10 pt-4">
      <p className="font-serif text-lg text-white/90 italic mb-2">
        "Transitioning from maker to strategist."
      </p>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
        <span>Vol. 01</span>
        <span>Read Time: 5 Min</span>
      </div>
    </div>
  );
}

function VisualBlackhole() {
  return (
    <div className="relative flex-1 flex items-center justify-center min-h-[100px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 rounded-full border border-dashed border-white/30"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute w-8 h-8 rounded-full border border-dotted border-white/50"
      />
      <div className="absolute w-1 h-1 bg-white rounded-full" />
    </div>
  );
}

// ─── Main Card Component ──────────────────────────────────

export interface BentoCardProps {
  item: BentoItem;
}

export function BentoCard({ item }: BentoCardProps) {
  const Icon = iconMap[item.iconName] ?? Zap;

  // 根据预设尺寸决定占位
  let spanClasses = '';
  switch (item.size) {
    case 'hero':
      spanClasses = 'md:col-span-2 md:row-span-2 min-h-[420px] p-8';
      break;
    case 'tall':
      spanClasses = 'md:col-span-1 md:row-span-2 min-h-[420px] p-6';
      break;
    case 'standard':
      spanClasses = 'col-span-1 row-span-1 min-h-[200px] p-6';
      break;
  }

  // Blackhole 卡片使用极端极简的样式
  const isBlackhole = item.visualMode === 'blackhole';
  const cardStyle = isBlackhole
    ? { background: 'transparent', border: '1px solid transparent' }
    : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)' };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={isBlackhole ? { scale: 1.02 } : hoverStyle}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className={`relative flex flex-col overflow-hidden rounded-3xl cursor-pointer backdrop-blur-md ${spanClasses}`}
      style={cardStyle}
    >
      {/* 头部：Icon、Title、Status */}
      <div className={`flex ${item.size === 'hero' ? 'items-start gap-4 mb-6' : 'items-center justify-between mb-4'}`}>
        {!isBlackhole && (
          <div
            className={`flex items-center justify-center flex-shrink-0 ${item.size === 'hero' ? 'h-11 w-11 rounded-2xl' : 'h-10 w-10 rounded-xl'}`}
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <Icon size={item.size === 'hero' ? 22 : 20} className="text-white" />
          </div>
        )}
        
        <div className={item.size === 'hero' ? 'flex-1' : ''}>
          <div className={`flex items-center ${item.size === 'hero' ? 'gap-2 mb-0.5' : 'justify-between'}`}>
            {item.size === 'hero' ? (
              <h2 className="text-2xl font-bold tracking-tight text-white">{item.title}</h2>
            ) : null}
            {!isBlackhole && <StatusBadge status={item.status} />}
          </div>
          {item.size === 'hero' ? (
            <p className="text-xs font-mono tracking-wider text-neutral-400">
              {item.subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {/* 非 Hero 时的标题区 (Standard/Tall) */}
      {item.size !== 'hero' && (
        <>
          <h2 className={`font-bold tracking-tight text-white mb-1 ${isBlackhole ? 'text-center text-sm opacity-50' : 'text-lg'}`}>
            {item.title}
          </h2>
          {!isBlackhole && (
            <p className="text-xs font-mono mb-3 text-neutral-400">
              {item.subtitle}
            </p>
          )}
        </>
      )}

      {/* 描述与标签区 */}
      {!isBlackhole && (
        <p className="relative text-sm leading-relaxed text-neutral-500 mb-4 max-w-md">
          {item.description}
        </p>
      )}

      {!isBlackhole && item.tags && item.size === 'hero' && (
        <div className="relative flex flex-wrap gap-2 mb-6">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-[11px] font-mono font-medium tracking-wide text-neutral-300"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* --- Visual Zone 分发渲染 --- */}
      <div className="flex-1 flex flex-col">
        {item.visualMode === 'pixel-hero' && <VisualPixelHero />}
        {item.visualMode === 'gallery' && <VisualGallery />}
        {item.visualMode === 'terminal' && <VisualTerminal />}
        {item.visualMode === 'typography' && <VisualTypography />}
        {item.visualMode === 'blackhole' && <VisualBlackhole />}
      </div>

    </motion.article>
  );
}
