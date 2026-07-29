'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Maximize2, Box } from 'lucide-react';
import type { BentoItem, GalleryItem } from '../data/bento-items';

interface SpatialGalleryModalProps {
  item: BentoItem;
  onClose: () => void;
}

export function SpatialGalleryModal({ item, onClose }: SpatialGalleryModalProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<GalleryItem | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (idx: number) => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setHoveredIndex(idx);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 150); // 延迟隐藏，允许鼠标平滑移动到悬浮卡片上
  };

  const galleryItems = item.galleryItems || [];
  
  // 当前悬浮展示的图片组
  const activeImages = hoveredIndex !== null ? galleryItems[hoveredIndex].images : [];

  return (
    <>
      {/* ─── 第一层：互动式列表与悬浮图片 ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c]/90 backdrop-blur-2xl"
      >
        {/* 关闭整个画廊按钮 */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-10 md:right-10 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-[60]"
        >
          <X size={24} />
        </button>

        <div className="absolute top-10 left-10 z-[60] pointer-events-none">
          <h1 className="text-3xl font-bold text-white tracking-tight">{item.title} ({galleryItems.length})</h1>
        </div>

        {/* 全屏文字列表 (Z-Index 较低) */}
        <div className="absolute inset-0 overflow-y-auto custom-scrollbar z-20">
          <div className="min-h-screen py-40 px-6 md:px-20 max-w-7xl mx-auto flex flex-col gap-6">
            {galleryItems.map((gItem, idx) => (
              <div
                key={gItem.id}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
                className="flex flex-col md:flex-row md:items-center justify-between group cursor-default border-b border-white/5 pb-6 transition-colors hover:border-white/20"
              >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/20 group-hover:text-white transition-colors duration-300">
                  {gItem.title}
                </h2>
                <div className="mt-4 md:mt-0 flex gap-6 md:gap-12 items-center text-sm md:text-base font-mono uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300">
                  <span>{gItem.category}</span>
                  <span>— {gItem.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 屏幕中央的动态图片叠放区 (Z-Index 调高至 30，允许点击) */}
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-30">
          <AnimatePresence mode="wait">
            {activeImages.length > 0 && hoveredIndex !== null && (
              <motion.div 
                key={hoveredIndex} 
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-[300px] h-[400px] md:w-[450px] md:h-[550px] pointer-events-auto cursor-pointer group"
                onClick={() => setSelectedDetail(galleryItems[hoveredIndex])}
                onMouseEnter={() => {
                  if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                {/* 悬浮提示框 */}
                <div className="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-2xl backdrop-blur-[2px]">
                  <span className="px-6 py-3 bg-white text-black font-semibold rounded-full uppercase tracking-widest text-sm shadow-xl">
                    View Project
                  </span>
                </div>

                {activeImages.map((imgSrc, imgIdx) => (
                  <motion.div
                    key={imgIdx}
                    layoutId={imgIdx === 0 ? `gallery-cover-${galleryItems[hoveredIndex].id}` : undefined} // 仅对首图启用共享动画
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900"
                    style={{
                      top: `-${imgIdx * 20}px`,
                      scale: 1 - imgIdx * 0.05,
                      zIndex: activeImages.length - imgIdx,
                      opacity: 1 - imgIdx * 0.15,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgSrc} alt="Gallery item" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>


      {/* ─── 第二层：项目深度详情页 ─── */}
      <AnimatePresence>
        {selectedDetail && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto custom-scrollbar"
          >
            {/* Header */}
            <div className="sticky top-0 z-50 w-full p-6 md:p-10 flex items-center justify-between bg-gradient-to-b from-[#050505] to-transparent backdrop-blur-sm">
              <button 
                onClick={() => setSelectedDetail(null)}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors font-medium border border-white/10"
              >
                <ArrowLeft size={18} />
                Back to Gallery
              </button>
            </div>

            {/* Hero Section */}
            <div className="w-full max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20">
              <div className="flex gap-4 font-mono text-sm tracking-widest text-neutral-400 uppercase mb-4">
                <span>{selectedDetail.category}</span>
                <span>/</span>
                <span>{selectedDetail.year}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-12">
                {selectedDetail.title}
              </h1>

              {/* Cover Image Morphing */}
              <motion.div 
                layoutId={`gallery-cover-${selectedDetail.id}`}
                className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-16 shadow-2xl border border-white/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedDetail.images[0]} alt={selectedDetail.title} className="w-full h-full object-cover" />
              </motion.div>

              {/* Description */}
              {selectedDetail.description && (
                <div className="max-w-3xl mb-24">
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-neutral-600"></span> Concept
                  </h3>
                  <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-light whitespace-pre-wrap">
                    {selectedDetail.description}
                  </p>
                </div>
              )}

              {/* Video Section */}
              {selectedDetail.videoUrl && (
                <div className="mb-24">
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-10 flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-neutral-600"></span> Video Presentation
                  </h3>
                  <div className="rounded-3xl overflow-hidden border border-white/5 bg-neutral-900 shadow-2xl">
                    <video 
                      src={selectedDetail.videoUrl} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                </div>
              )}

              {/* Drawings Grid */}
              {selectedDetail.drawings && selectedDetail.drawings.length > 0 && (
                <div className="mb-24">
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-10 flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-neutral-600"></span> Drawings & Elevations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedDetail.drawings.map((draw, idx) => (
                      <div 
                        key={idx}
                        className="group relative rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 aspect-video cursor-pointer"
                        onClick={() => setZoomedImage(draw)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={draw} alt="Drawing" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                        <div className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 size={16} className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Files (Horizontal Scroll) */}
              {selectedDetail.processFiles && selectedDetail.processFiles.length > 0 && (
                <div className="mb-24">
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-10 flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-neutral-600"></span> Process & Development
                  </h3>
                  <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-8 snap-x">
                    {selectedDetail.processFiles.map((proc, idx) => (
                      <div 
                        key={idx}
                        className="flex-shrink-0 w-[85%] md:w-[60%] rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 snap-center cursor-pointer group relative aspect-video"
                        onClick={() => setZoomedImage(proc)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={proc} alt="Process" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                        <div className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <Maximize2 size={16} className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group Photos (Horizontal Scroll) */}
              {selectedDetail.groupPhotos && selectedDetail.groupPhotos.length > 0 && (
                <div className="mb-24">
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-10 flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-neutral-600"></span> Team & Moments
                  </h3>
                  <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-8 snap-x">
                    {selectedDetail.groupPhotos.map((photo, idx) => (
                      <div 
                        key={idx}
                        className="flex-shrink-0 w-[85%] md:w-[60%] rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 snap-center cursor-pointer group relative aspect-video"
                        onClick={() => setZoomedImage(photo)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo} alt="Group Photo" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                        <div className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <Maximize2 size={16} className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3D Model Placeholder */}
              <div className="mb-20">
                <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-10 flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-neutral-600"></span> Interactive Model
                </h3>
                <div className="w-full h-[500px] md:h-[700px] rounded-3xl border border-white/10 bg-black flex flex-col items-center justify-center relative overflow-hidden group">
                  {/* 网格背景模拟 3D 空间 */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                  
                  <Box size={48} className="text-white/20 mb-6 group-hover:text-white/40 transition-colors duration-500" />
                  <p className="text-neutral-400 font-mono tracking-widest">3D VIEWER CANVAS</p>
                  <p className="text-neutral-600 text-sm mt-2 max-w-sm text-center">
                    (Embed Spline or Three.js iframe here)
                  </p>

                  {/* 模拟模型加载 UI */}
                  {selectedDetail.modelUrl && (
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center px-6 py-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl">
                      <span className="text-xs font-mono text-neutral-400">Loading model from {selectedDetail.modelUrl}...</span>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 第三层：全屏图纸放大 (Lightbox) ─── */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={zoomedImage}
              alt="Zoomed"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
