'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Zone } from '@/types/mission';

interface MissionMapProps {
  zones: Zone[];
  onZoneSelect: (zone: Zone) => void;
  selectedZone?: Zone;
}

export function MissionMap({ zones, onZoneSelect, selectedZone }: MissionMapProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[16/9] bg-background rounded-lg border overflow-hidden shadow-xl">
      {/* Fond de carte pixelisé */}
      <div 
        className="absolute inset-0 bg-[url('/images/world-map.jpg')] bg-cover bg-center"
        style={{
          imageRendering: 'pixelated',
          filter: 'contrast(1.1) brightness(0.9)',
        }}
      />
      
      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-transparent to-background/70" />
      
      {/* Grille pixelisée */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px),
                           repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)`,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Zones cliquables */}
      {zones.map((zone) => (
        <motion.button
          key={zone.id}
          onClick={() => onZoneSelect(zone)}
          onHoverStart={() => setHoveredZone(zone.id)}
          onHoverEnd={() => setHoveredZone(null)}
          className={cn(
            'absolute transform transition-all duration-300',
            'rounded-none border-2 backdrop-blur-sm',
            zone.unlocked ? 'cursor-pointer hover:backdrop-blur-md' : 'cursor-not-allowed opacity-50',
            selectedZone?.id === zone.id ? 'border-primary ring-2 ring-primary bg-primary/20' : 'border-white/20 hover:border-white/40',
            hoveredZone === zone.id && 'border-primary/50 bg-primary/10'
          )}
          style={{
            left: `${zone.coordinates.x}%`,
            top: `${zone.coordinates.y}%`,
            width: `${zone.coordinates.width}%`,
            height: `${zone.coordinates.height}%`,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Info bulle de zone */}
          <div className={cn(
            'absolute left-1/2 -translate-x-1/2 bottom-full mb-2 p-2',
            'bg-background border rounded-lg shadow-lg',
            'opacity-0 group-hover:opacity-100 transition-opacity',
            'whitespace-nowrap'
          )}>
            <h3 className="font-bold">{zone.name}</h3>
            <p className="text-sm text-muted-foreground">{zone.description}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
