export type MissionDifficulty = 'easy' | 'medium' | 'hard' | 'boss';
export type MissionStatus = 'locked' | 'available' | 'completed';
export type MissionType = 'battle' | 'freestyle' | 'concert' | 'training';

export interface Zone {
  id: string;
  name: string;
  description: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  unlocked: boolean;
  missions: Mission[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: MissionType;
  difficulty: MissionDifficulty;
  status: MissionStatus;
  rewards: {
    reputation: number;
    money: number;
    unlocks?: string[];
  };
  requirements?: {
    minLevel?: number;
    completedMissions?: string[];
    reputation?: number;
  };
}
