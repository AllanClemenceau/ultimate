export interface PlayerStats {
  level: number;
  experience: number;
  reputation: number;
  money: number;
}

export interface PlayerProgress {
  completedMissions: string[];
  unlockedZones: string[];
  currentMission?: string;
}

export interface Player {
  id: string;
  name: string;
  stats: PlayerStats;
  progress: PlayerProgress;
}

export interface MissionRequirement {
  type: 'level' | 'reputation' | 'mission' | 'zone';
  value: number | string;
}

export interface MissionReward {
  experience: number;
  reputation: number;
  money: number;
  unlocks?: {
    type: 'zone' | 'mission' | 'item';
    id: string;
  }[];
}
