'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Mission } from '@/types/mission';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { TrophyIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/outline';

const missionTypeIcons = {
  battle: SparklesIcon,
  freestyle: MusicalNoteIcon,
  concert: TrophyIcon,
  training: BookOpenIcon,
};

const difficultyColors = {
  easy: 'bg-success/10 text-success border-success/50',
  medium: 'bg-warning/10 text-warning border-warning/50',
  hard: 'bg-destructive/10 text-destructive border-destructive/50',
  boss: 'bg-primary/10 text-primary border-primary/50',
};

interface MissionCardProps {
  mission: Mission;
  onClick?: () => void;
  selected?: boolean;
}

export function MissionCard({ mission, onClick, selected }: MissionCardProps) {
  const Icon = missionTypeIcons[mission.type];
  const isLocked = mission.status === 'locked';

  return (
    <motion.div
      onClick={isLocked ? undefined : onClick}
      className={cn(
        'relative p-4 rounded-lg border bg-background',
        'transition-all duration-300',
        isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50',
        selected && 'border-primary ring-2 ring-primary ring-offset-2'
      )}
      whileHover={isLocked ? {} : { scale: 1.02 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
    >
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
          <LockClosedIcon className="w-8 h-8 text-muted-foreground" />
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={cn(
          'p-2 rounded-lg',
          difficultyColors[mission.difficulty]
        )}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold">{mission.title}</h3>
          <p className="text-sm text-muted-foreground">{mission.description}</p>
          
          {/* Récompenses */}
          <div className="mt-2 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <TrophyIcon className="w-4 h-4" />
              <span>{mission.rewards.reputation} Rep</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">$</span>
              <span>{mission.rewards.money}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
