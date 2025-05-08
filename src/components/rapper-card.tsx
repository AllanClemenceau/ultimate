'use client';

import type { Rapper } from '@/types/rapper';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface RapperCardProps {
  rapper: Rapper;
  selected?: boolean;
  onClick?: () => void;
  emoji?: string;
}

const EMOJI_ANIMATIONS = [
  'animate-bounce',
  'animate-spin-slow',
  'animate-pulse',
  'animate-wiggle',
  'animate-swing',
  'animate-flip',
  'animate-float',
  'animate-shake',
];

function getEmojiAnimation(key: string | number) {
  let n = 0;
  if (typeof key === 'string') {
    for (let i = 0; i < key.length; i++) n += key.charCodeAt(i);
  } else {
    n = key;
  }
  return EMOJI_ANIMATIONS[n % EMOJI_ANIMATIONS.length];
}

function getTagline(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('freeze') || lower.includes('ice')) return 'Ice Cold Flow';
  if (lower.includes('corleone')) return 'The Don of Bars';
  if (lower.includes('meme')) return 'Certified Meme Machine';
  if (lower.includes('queen')) return 'Royalty in the Booth';
  if (lower.includes('king')) return 'King of the Streets';
  if (lower.includes('young')) return 'Young & Wild';
  if (lower.includes('drip')) return 'Drip God';
  if (lower.includes('shadow')) return 'Moves in Silence';
  return 'Street Legend';
}

export function RapperCard({ rapper, selected = false, onClick, emoji }: RapperCardProps) {
  return (
    <motion.div
      layoutId={`rapper-${rapper.id}`}
      onClick={onClick}
      tabIndex={0}
      whileHover={{ scale: 1.09, rotate: selected ? 2 : 0 }}
      whileTap={{ scale: 0.97, rotate: selected ? -2 : 0 }}
      className={`relative group cursor-pointer select-none transition-all duration-300 outline-none border border-black rounded-2xl bg-white flex flex-col items-center justify-start overflow-visible min-h-[220px] max-h-[260px] min-w-[150px] max-w-[190px] p-3`}
      style={{ fontFamily: 'var(--font-modern)', boxShadow: '6px 6px 0 0 #000' }}
      aria-label={`Select ${rapper.name}`}
    >
      {emoji && (
        <span
          className={`absolute -top-5 -right-5 text-4xl drop-shadow-2xl pointer-events-none select-none ${getEmojiAnimation(rapper.id)}`}
          style={{ zIndex: 10 }}
        >
          {emoji}
        </span>
      )}
      <div className="relative aspect-[1/1.2] w-full overflow-hidden rounded-xl flex items-center justify-center border border-black bg-gray-100 mb-2">
        {rapper.images.front ? (
          <Image
            src={rapper.images.front}
            alt={rapper.name}
            fill
            sizes="120px"
            className="object-cover"
            style={{ borderRadius: 12 }}
            priority
          />
        ) : (
          <span className="text-5xl">{emoji || '🎤'}</span>
        )}
      </div>
      <div className={`mt-2 mb-1 text-xl font-extrabold w-full truncate text-black`} style={{ fontFamily: 'var(--font-modern)' }}>
        <span className="border-b-2 border-[var(--accent-purple)] pb-0.5">{rapper.name}</span>
      </div>
      <div className="text-xs text-pink-300 font-bold italic text-center mt-1 w-full whitespace-nowrap overflow-hidden text-ellipsis">
        {getTagline(rapper.name)}
      </div>
    </motion.div>
  );
}

