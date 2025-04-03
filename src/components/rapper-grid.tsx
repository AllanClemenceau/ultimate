'use client';

import { Rapper } from '@/types/rapper';
import { RapperCard } from './rapper-card';
import { useState } from 'react';

interface RapperGridProps {
  rappers: Rapper[];
  onSelect?: (rapper: Rapper) => void;
}

export function RapperGrid({ rappers, onSelect }: RapperGridProps) {
  const [selectedRapper, setSelectedRapper] = useState<string | null>(null);

  const handleSelect = (rapper: Rapper) => {
    setSelectedRapper(rapper.id);
    onSelect?.(rapper);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {rappers.map((rapper) => (
        <RapperCard
          key={rapper.id}
          rapper={rapper}
          selected={rapper.id === selectedRapper}
          onClick={() => handleSelect(rapper)}
        />
      ))}
    </div>
  );
}
