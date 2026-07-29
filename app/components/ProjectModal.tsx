'use client';

import { motion } from 'framer-motion';
import { X, Code, ArrowRight, MessageSquare, Zap, ArrowLeft } from 'lucide-react';
import type { ProjectDetail } from '../data/bento-items';

interface ProjectModalProps {
  project: ProjectDetail;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 sm:p-6"
    >
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Modal 内容 */}
      <motion.div
        layoutId={`project-card-${project.id}`} // 核心：使用 shared layoutId 达成丝滑跳出放大动画
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full h-[100dvh] md:h-auto md:max-w-3xl max-h-none md:max-h-[85vh] overflow-y-auto rounded-none md:rounded-3xl bg-neutral-950 md:bg-neutral-950/80 border-none md:border-solid md:border-white/10 shadow-2xl custom-scrollbar"
        style={{
          boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* 关闭/返回按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 md:top-6 md:right-6 md:left-auto p-2 rounded-full bg-black/40 md:bg-white/5 hover:bg-black/60 md:hover:bg-white/10 text-white transition-colors z-20 backdrop-blur-md"
        >
          <span className="md:hidden"><ArrowLeft size={24} /></span>
          <span className="hidden md:block"><X size={20} /></span>
        </button>

        {/* 顶部占位大图 / Cover */}
        <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-neutral-900 to-black border-b border-white/10 flex items-center justify-center relative overflow-hidden">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent" />
          )}
          <h1 className="relative text-3xl sm:text-5xl font-bold text-white tracking-tight text-center z-10">
            {project.title}
          </h1>
        </div>

        {/* 内容区 */}
        <div className="p-6 sm:p-10 space-y-12">
          
          {/* Description */}
          {project.description && (
            <section>
              <h3 className="text-sm font-mono text-neutral-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-[1px] bg-neutral-500"></span> Overview
              </h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
                {project.description}
              </p>
            </section>
          )}

          {/* Features & Workflow (Two Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {project.features && (
              <section>
                <h3 className="text-sm font-mono text-neutral-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-neutral-500"></span> Core Features
                </h3>
                <ul className="space-y-3">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-300">
                      <Zap size={16} className="mt-1 text-white/50 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(project.workflow || project.workflowImage) && (
              <section className={project.workflowImage ? "md:col-span-2 mt-4" : ""}>
                <h3 className="text-sm font-mono text-neutral-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-neutral-500"></span> Workflow Architecture
                </h3>
                {project.workflowImage ? (
                  <div className="w-full rounded-2xl border border-white/10 bg-[#0f0f11] overflow-hidden p-2 shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={project.workflowImage} 
                      alt="Workflow Architecture" 
                      className="w-full h-auto rounded-xl opacity-90 hover:opacity-100 transition-opacity" 
                    />
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {project.workflow?.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-neutral-300">
                        <ArrowRight size={16} className="mt-1 text-white/50 shrink-0" />
                        <span className="font-mono text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </div>

          {/* GitHub Link */}
          {project.githubUrl && (
            <section className="pt-4">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
              >
                <Code size={18} />
                Download Tool (Releases)
              </a>
            </section>
          )}

          {/* 模拟留言板 (Guestbook) */}
          <section className="pt-10 border-t border-white/10 mt-12">
            <h3 className="text-sm font-mono text-neutral-400 mb-6 uppercase tracking-widest flex items-center gap-2">
              <MessageSquare size={16} className="text-neutral-500" /> 
              Guestbook
            </h3>
            
            <div className="flex gap-4 mb-8">
              <input 
                type="text" 
                placeholder="Leave a message..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors font-medium">
                Sign
              </button>
            </div>

            <div className="space-y-4">
              {/* 假数据评论 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white/90 text-sm">Anonymous Designer</span>
                  <span className="text-xs text-neutral-500 font-mono">Just now</span>
                </div>
                <p className="text-sm text-neutral-400">This UI is insanely clean. Love the glassmorphism!</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white/90 text-sm">Developer Dave</span>
                  <span className="text-xs text-neutral-500 font-mono">2 days ago</span>
                </div>
                <p className="text-sm text-neutral-400">Great architecture on this Next.js project.</p>
              </div>
            </div>
          </section>

        </div>
      </motion.div>
    </motion.div>
  );
}
