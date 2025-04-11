'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import type { Player, PlayerStats, PlayerProgress, MissionReward } from '@/types/player';
import type { Zone, Mission } from '@/types/mission';

interface ProgressionState {
  player: Player;
  availableMissions: Mission[];
  unlockedZones: Zone[];
}

type ProgressionAction =
  | { type: 'COMPLETE_MISSION'; missionId: string; reward: MissionReward }
  | { type: 'UNLOCK_ZONE'; zoneId: string }
  | { type: 'UPDATE_STATS'; stats: Partial<PlayerStats> }
  | { type: 'START_MISSION'; missionId: string }
  | { type: 'LOAD_PROGRESS'; progress: PlayerProgress };

const initialState: ProgressionState = {
  player: {
    id: 'default',
    name: 'Rappeur',
    stats: {
      level: 1,
      experience: 0,
      reputation: 0,
      money: 1000,
    },
    progress: {
      completedMissions: [],
      unlockedZones: ['downtown'], // Zone de départ
    },
  },
  availableMissions: [],
  unlockedZones: [],
};

function calculateLevel(experience: number): number {
  // Chaque niveau nécessite 1000 * niveau actuel d'XP
  let level = 1;
  let xpNeeded = 1000;
  
  while (experience >= xpNeeded) {
    experience -= xpNeeded;
    level++;
    xpNeeded = 1000 * level;
  }
  
  return level;
}

function progressionReducer(state: ProgressionState, action: ProgressionAction): ProgressionState {
  switch (action.type) {
    case 'COMPLETE_MISSION': {
      const newStats = {
        experience: state.player.stats.experience + action.reward.experience,
        reputation: state.player.stats.reputation + action.reward.reputation,
        money: state.player.stats.money + action.reward.money,
      };

      const newLevel = calculateLevel(newStats.experience);
      
      // Débloquer les récompenses
      let newUnlockedZones = [...state.player.progress.unlockedZones];
      action.reward.unlocks?.forEach((unlock) => {
        if (unlock.type === 'zone') {
          newUnlockedZones.push(unlock.id);
        }
      });

      return {
        ...state,
        player: {
          ...state.player,
          stats: {
            ...state.player.stats,
            ...newStats,
            level: newLevel,
          },
          progress: {
            ...state.player.progress,
            completedMissions: [...state.player.progress.completedMissions, action.missionId],
            unlockedZones: newUnlockedZones,
            currentMission: undefined,
          },
        },
      };
    }

    case 'UNLOCK_ZONE':
      if (state.player.progress.unlockedZones.includes(action.zoneId)) {
        return state;
      }
      return {
        ...state,
        player: {
          ...state.player,
          progress: {
            ...state.player.progress,
            unlockedZones: [...state.player.progress.unlockedZones, action.zoneId],
          },
        },
      };

    case 'UPDATE_STATS':
      return {
        ...state,
        player: {
          ...state.player,
          stats: {
            ...state.player.stats,
            ...action.stats,
          },
        },
      };

    case 'START_MISSION':
      return {
        ...state,
        player: {
          ...state.player,
          progress: {
            ...state.player.progress,
            currentMission: action.missionId,
          },
        },
      };

    case 'LOAD_PROGRESS':
      return {
        ...state,
        player: {
          ...state.player,
          progress: action.progress,
        },
      };

    default:
      return state;
  }
}

const ProgressionContext = createContext<{
  state: ProgressionState;
  completeMission: (missionId: string, reward: MissionReward) => void;
  unlockZone: (zoneId: string) => void;
  updateStats: (stats: Partial<PlayerStats>) => void;
  startMission: (missionId: string) => void;
  loadProgress: (progress: PlayerProgress) => void;
} | null>(null);

export function ProgressionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(progressionReducer, initialState);

  // Charger la progression depuis le localStorage au démarrage
  useEffect(() => {
    const savedProgress = localStorage.getItem('playerProgress');
    if (savedProgress) {
      dispatch({ type: 'LOAD_PROGRESS', progress: JSON.parse(savedProgress) });
    }
  }, []);

  // Sauvegarder la progression dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('playerProgress', JSON.stringify(state.player.progress));
  }, [state.player.progress]);

  const completeMission = (missionId: string, reward: MissionReward) => {
    dispatch({ type: 'COMPLETE_MISSION', missionId, reward });
  };

  const unlockZone = (zoneId: string) => {
    dispatch({ type: 'UNLOCK_ZONE', zoneId });
  };

  const updateStats = (stats: Partial<PlayerStats>) => {
    dispatch({ type: 'UPDATE_STATS', stats });
  };

  const startMission = (missionId: string) => {
    dispatch({ type: 'START_MISSION', missionId });
  };

  const loadProgress = (progress: PlayerProgress) => {
    dispatch({ type: 'LOAD_PROGRESS', progress });
  };

  return (
    <ProgressionContext.Provider
      value={{
        state,
        completeMission,
        unlockZone,
        updateStats,
        startMission,
        loadProgress,
      }}
    >
      {children}
    </ProgressionContext.Provider>
  );
}

export function useProgression() {
  const context = useContext(ProgressionContext);
  if (!context) {
    throw new Error('useProgression must be used within a ProgressionProvider');
  }
  return context;
}
