'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.getAnnouncement().then(res => setAnnouncement(res));
  }, []);

  if (!announcement) return null;

  // Split messages by custom separator if it exists
  const messages = announcement.split(' • ').map(m => m.trim());

  return (
    <div className="bg-primary text-primary-foreground text-[11px] font-semibold tracking-widest uppercase py-2.5 px-4 text-center border-b border-white/10 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex justify-center items-center h-4">
        {messages.length <= 1 ? (
          <span>{announcement}</span>
        ) : (
          <div className="relative w-full h-full flex justify-center items-center">
            {messages.map((msg, i) => (
              i === index && (
                <motion.span
                  key={msg}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute"
                >
                  {msg}
                </motion.span>
              )
            ))}
          </div>
        )}
      </div>
      {messages.length > 1 && (
        <TickerController messagesCount={messages.length} setIndex={setIndex} />
      )}
    </div>
  );
}

function TickerController({ messagesCount, setIndex }: { messagesCount: number, setIndex: React.Dispatch<React.SetStateAction<number>> }) {
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messagesCount);
    }, 4000);
    return () => clearInterval(timer);
  }, [messagesCount, setIndex]);
  return null;
}
