'use client';

import { Rapper } from '@/types/rapper';
import { RapperCard } from './rapper-card';
import { useState } from 'react';

interface RapperGridProps {
  rappers: Rapper[];
  onSelect?: (rapper: Rapper) => void;
}

import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

import { RapperLightbox } from './rapper-lightbox';

export function RapperGrid({ rappers, onSelect }: RapperGridProps) {
  const [selectedRapper, setSelectedRapper] = useState<Rapper | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleSelect = (rapper: Rapper) => {
    setSelectedRapper(rapper);
    onSelect?.(rapper);
  };

  // Demo: Add a "Create Your Own Hero" card at the start
  const EMOJI_LIST = ['🔥', '💯', '😈', '🥶', '🚀', '🧃', '🎤', '🖤'];
  const allCards = [
    { id: 'create-hero', isCreate: true },
    ...rappers.map(r => ({ ...r, isCreate: false }))
  ];

  return (
    <div
      ref={carouselRef}
      className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory bg-white"
      style={{ WebkitOverflowScrolling: 'touch', overflow: 'visible', fontFamily: 'var(--font-modern)' }}
    >
      <AnimatePresence initial={false}>
        {allCards.map((item, idx) =>
          item.isCreate ? (
            <motion.div
              key="create-hero"
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.97, rotate: -2 }}
              className="min-w-[180px] max-w-[220px] snap-center flex-shrink-0"
              style={{ overflow: 'visible' }}
            >
              <button
                onClick={() => onSelect?.({ id: 'create-hero' } as any)}
                className="w-full h-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-3xl flex flex-col items-center justify-center shadow-xl p-4 border-4 border-dashed border-white hover:shadow-2xl transition-all relative"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
              >
                <span className="text-3xl mb-2">🎨🧃</span>
                <span className="text-base font-extrabold text-white drop-shadow-lg tracking-widest uppercase">Create Your Own Hero</span>
                <span className="absolute bottom-2 right-4 text-xs text-white/80 rotate-[-8deg]">Graffiti Mode</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.07, rotate: 1 }}
              whileTap={{ scale: 0.95, rotate: -1 }}
              className="min-w-[180px] max-w-[220px] snap-center flex-shrink-0"
              style={{ overflow: 'visible' }}
            >
              <RapperCard
                rapper={item as Rapper}
                emoji={EMOJI_LIST[idx % EMOJI_LIST.length]}
                selected={selectedRapper ? item.id === selectedRapper.id : false}
                onClick={() => handleSelect(item as Rapper)}
              />
            </motion.div>
          )
        )}
      </AnimatePresence>
      {/* Lightbox Modal */}
      <RapperLightbox
        rapper={selectedRapper}
        open={!!selectedRapper}
        onClose={() => setSelectedRapper(null)}
      />
    </div>
  );
}
