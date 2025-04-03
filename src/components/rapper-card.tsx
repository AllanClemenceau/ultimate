'use client';

import type { Rapper, BaseStats } from '@/types/rapper';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface RapperCardProps {
  rapper: Rapper;
  selected?: boolean;
  onClick?: () => void;
}

function StatBar({ value = 0, label }: { value?: number; label: string | undefined }) {
  const normalizedValue = Math.max(0, Math.min(100, value || 0));
  
  return (
    <div className="relative group">
      <button
        className={cn(
          'peer', 
          'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
          'border-2 hover:scale-110',
          normalizedValue >= 90 ? 'border-primary bg-primary/10 text-primary hover:bg-primary/20' :
          normalizedValue >= 70 ? 'border-success bg-success/10 text-success hover:bg-success/20' :
          normalizedValue >= 50 ? 'border-warning bg-warning/10 text-warning hover:bg-warning/20' :
          'border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20'
        )}
      >
        <span className="font-bold text-lg tabular-nums">{normalizedValue}</span>
      </button>
      
      {/* Tooltip au survol */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none peer-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-background border rounded-md px-2 py-1 text-sm whitespace-nowrap shadow-lg">
          {label || 'N/A'}
        </div>
      </div>
    </div>
  );
}

export function RapperCard({ rapper, selected = false, onClick }: RapperCardProps) {

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-lg border bg-background transition-all duration-300',
        selected ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-muted hover:border-primary/50',
        onClick ? 'cursor-pointer' : ''
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
        {rapper.images.front ? (
          <Image
            src={rapper.images.front}
            alt={rapper.name}
            fill
            priority
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="text-4xl font-bold text-muted-foreground">
            {rapper.name[0]}
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-bold text-lg">{rapper.name}</h3>
          <p className="text-sm text-muted-foreground">{rapper.location.name}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(rapper.stats) as Array<keyof typeof rapper.stats>)
            .filter(key => key !== 'displayNames')
            .map(key => (
              <StatBar 
                key={key}
                label={rapper.stats.displayNames[key as keyof BaseStats]}
                value={rapper.stats[key] as number}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
