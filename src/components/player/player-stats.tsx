'use client';

import { motion } from 'framer-motion';
import { useProgression } from '@/contexts/progression-context';
import { TrophyIcon, BanknotesIcon, SparklesIcon } from '@heroicons/react/24/outline';

export function PlayerStats() {
  const { state } = useProgression();
  const { stats } = state.player;

  const xpForNextLevel = 1000 * stats.level;
  const currentLevelXp = stats.experience % xpForNextLevel;
  const xpProgress = (currentLevelXp / xpForNextLevel) * 100;

  return (
    <div className="bg-background/80 backdrop-blur-sm border rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Niveau {stats.level}</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>XP</span>
          <span className="font-mono">{currentLevelXp}/{xpForNextLevel}</span>
        </div>
      </div>

      {/* Barre de progression XP */}
      <div className="relative h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${xpProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-2 rounded-lg bg-background/50">
          <TrophyIcon className="w-5 h-5 text-warning mb-1" />
          <span className="text-xs text-muted-foreground">Réputation</span>
          <span className="font-bold">{stats.reputation}</span>
        </div>

        <div className="flex flex-col items-center p-2 rounded-lg bg-background/50">
          <BanknotesIcon className="w-5 h-5 text-success mb-1" />
          <span className="text-xs text-muted-foreground">Argent</span>
          <span className="font-bold">${stats.money}</span>
        </div>

        <div className="flex flex-col items-center p-2 rounded-lg bg-background/50">
          <SparklesIcon className="w-5 h-5 text-primary mb-1" />
          <span className="text-xs text-muted-foreground">Missions</span>
          <span className="font-bold">{state.player.progress.completedMissions.length}</span>
        </div>
      </div>
    </div>
  );
}
