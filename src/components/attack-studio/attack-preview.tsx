'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Attack } from '@/types/rapper';
import Image from 'next/image';

interface AttackPreviewProps {
  attack: Attack;
  autoPlay?: boolean;
  onComplete?: () => void;
}

export function AttackPreview({ attack, autoPlay = false, onComplete }: AttackPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!attack.animation || !autoPlay) return;

    // Démarrer l'animation
    setIsAnimating(true);
  }, [attack, autoPlay]);

  if (!attack.animation) return null;

  const { path, duration, easing, preset, scale = 1 } = attack.animation;

  // Appliquer les presets d'animation
  const getPresetAnimation = () => {
    switch (preset) {
      case 'shake':
        return {
          x: [path[0].x, path[0].x - 10, path[0].x + 10, path[0].x],
          y: [path[0].y, path[0].y],
        };
      case 'spin':
        return {
          rotate: [0, 360],
        };
      case 'bounce':
        return {
          y: [path[0].y, path[0].y - 30, path[0].y],
        };
      case 'flash':
        return {
          opacity: [1, 0, 1, 0, 1],
        };
      case 'fade':
        return {
          opacity: [1, 0],
        };
      case 'scale':
        return {
          scale: [1, 1.5, 1],
        };
      case 'wave':
        return {
          y: [path[0].y, path[0].y - 20, path[0].y + 20, path[0].y],
        };
      case 'glitch':
        return {
          x: [path[0].x, path[0].x + 5, path[0].x - 5, path[0].x],
          y: [path[0].y, path[0].y - 5, path[0].y + 5, path[0].y],
          opacity: [1, 0.8, 1, 0.9, 1],
        };
      case 'pixelate':
        // Note: Pour un vrai effet de pixelisation, il faudrait utiliser un shader
        return {
          filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'],
        };
      default:
        return {};
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    onComplete?.();
  };

  return (
    <div className="relative w-full h-[400px] bg-card rounded-lg overflow-hidden">
      {/* Zone de prévisualisation */}
      <div className="absolute inset-0">
        {/* Image/GIF de l'attaque */}
        {attack.animation.url && (
          <motion.div
            className="absolute"
            style={{
              x: path[0].x,
              y: path[0].y,
              scale,
            }}
            animate={{
              x: path.map(p => p.x),
              y: path.map(p => p.y),
              ...getPresetAnimation(),
            }}
            transition={{
              duration: duration / 1000,
              ease: easing,
              repeat: 0,
              times: path.map((_, i) => i / (path.length - 1))
            }}
            onAnimationComplete={handleAnimationComplete}
          >
            <div className="relative w-16 h-16">
              <Image
                src={attack.animation.url}
                alt="Attack animation"
                fill
                className="object-contain"
                unoptimized={attack.animation.type === 'gif'}
              />
            </div>
          </motion.div>
        )}

        {/* Placeholder si pas d'image */}
        {!attack.animation.url && (
          <motion.div
            className={`absolute w-16 h-16 ${!attack.animation.url ? 'bg-primary rounded-full' : ''}`}
            style={{
              x: path[0].x,
              y: path[0].y,
              scale,
            }}
            animate={{
              x: path.map(p => p.x),
              y: path.map(p => p.y),
              ...getPresetAnimation(),
            }}
            transition={{
              duration: duration / 1000,
              ease: easing,
              repeat: 0,
              times: path.map((_, i) => i / (path.length - 1))
            }}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </div>

      {/* Contrôles */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center">
        <button
          onClick={() => setIsPlaying(true)}
          disabled={isPlaying}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
        >
          Play Animation
        </button>
      </div>
    </div>
  );
}
