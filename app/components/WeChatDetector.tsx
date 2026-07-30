'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function WeChatDetector() {
  const [isWeChat, setIsWeChat] = useState(false);

  useEffect(() => {
    // 检测 User-Agent 是否包含 MicroMessenger (微信内置浏览器)
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('micromessenger')) {
      setIsWeChat(true);
    }
  }, []);

  if (!isWeChat) return null;

  return (
    <AnimatePresence>
      {isWeChat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[99999] bg-[#050505]/95 backdrop-blur-md flex flex-col items-center p-8"
        >
          {/* 指向右上角的箭头 */}
          <div className="absolute top-4 right-8 w-16 h-16 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 40 80 Q 70 80 80 40" />
              <polyline points="60 40 80 20 100 40" />
            </svg>
          </div>

          <div className="mt-32 flex flex-col items-center text-center space-y-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-white tracking-widest">
              提示
            </h2>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl w-full">
              <p className="text-white/90 text-[15px] leading-loose font-medium text-left">
                1. 请点击右上角的 <span className="font-bold text-white bg-white/10 px-2 py-1 rounded mx-1">···</span> 图标
                <br />
                2. 选择 <span className="font-bold text-white bg-white/10 px-2 py-1 rounded mx-1">在浏览器打开</span>
                <br />
                <br />
                <span className="text-sm text-neutral-500 font-normal mt-2 block">
                  (微信内置浏览器限制严格，会导致动画严重卡顿、排版错乱和图片加载失败)
                </span>
              </p>
            </div>
            
            <button 
              onClick={() => setIsWeChat(false)}
              className="mt-12 px-6 py-2 rounded-full border border-white/10 text-white/40 text-sm hover:bg-white/5 hover:text-white/80 transition-colors"
            >
              继续在微信中浏览 (可能会卡顿)
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
