'use client';

/**
 * page.tsx
 * ──────────────────────────────────────────────────────────
 * 页面组装层 — 只负责整合组件，不包含任何内联样式或硬编码内容。
 * 内容修改 → app/data/bento-items.ts
 * 样式修改 → app/globals.css 或对应组件
 */

import { motion, type Variants } from 'framer-motion';
import { BentoGrid } from './components/BentoGrid';
import { TypewriterText } from './components/TypewriterText';
import { bentoItems } from './data/bento-items';

// ease 的 bezier 四元组必须显式声明为 tuple，避免 Framer Motion v12 类型报错
const EASE_OUT_QUART = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// 页面整体入场动画
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Header 标题区动画
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_QUART },
  },
};

export default function Home() {
  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col max-w-[1800px] mx-auto w-full"
      style={{
        padding: 'var(--page-padding)',
        gap: '3rem',
      }}
    >
      {/* ── Page Header ──────────────────────────────────── */}
      <motion.header variants={headerVariants} className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1
            className="text-4xl font-bold tracking-tight h-[40px] md:h-auto"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <TypewriterText 
              text="JingYu's Digital Lab" 
              speed={60} 
              delay={300}
            />
          </h1>
          {/* Live indicator (Monochrome) */}
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#ffffff', boxShadow: '0 0 6px #ffffff' }}
            />
            ONLINE
          </span>
        </div>
        <p
          className="text-sm font-mono max-w-lg h-[20px] md:h-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <TypewriterText 
            text="AI Tools · Generative Workflows · Design Engineering" 
            speed={40} 
            delay={1500} 
            showCursorWhenDone={true}
            cursorClassName="bg-[var(--color-text-muted)] opacity-50"
          />
        </p>
      </motion.header>

      {/* ── Bento Grid ───────────────────────────────────── */}
      <section aria-label="Project Modules" className="flex-1">
        <BentoGrid items={bentoItems} />
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer
        className="text-xs font-mono text-center"
        style={{ color: 'var(--color-text-faint)' }}
      >
        built with Next.js · framer-motion · lucide-react
      </footer>
    </motion.main>
  );
}