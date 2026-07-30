'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number; // 延迟开始的时间 (ms)
  speed?: number; // 敲击每个字符的速度 (ms)
  className?: string;
  cursorClassName?: string;
  showCursorWhenDone?: boolean;
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  className = "",
  cursorClassName = "",
  showCursorWhenDone = false
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      timeoutId = setInterval(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === text.length) {
          clearInterval(timeoutId);
          setIsComplete(true);
        }
      }, speed);
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(timeoutId);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayedText}
      {(!isComplete || showCursorWhenDone) && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className={`inline-block w-[0.4em] h-[1em] bg-current align-middle ml-1 ${cursorClassName}`}
        />
      )}
    </span>
  );
}
