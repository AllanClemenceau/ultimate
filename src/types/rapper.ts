export type StatusEffect = 
  | 'sleep'    // Sommeil
  | 'slow'     // Ralentissement
  | 'poison'   // Poison
  | 'haste'    // Accélération
  | 'burn'     // Brûlure
  | 'stun'     // Étourdissement
  | 'freeze'   // Gel
  | 'confuse'  // Confusion
  | 'silence'  // Silence (empêche l'utilisation d'attaques)
  | 'strength' // Augmente les dégâts
  | 'defense'  // Augmente la défense
  | 'drain'    // Vol de vie
  | 'rage'     // Augmente les dégâts mais diminue la défense
  | 'shield';  // Bouclier temporaire

export type AnimationPreset = 
  | 'shake'      // Secousse
  | 'spin'       // Rotation
  | 'bounce'     // Rebond
  | 'flash'      // Clignotement
  | 'fadeIn'     // Apparition progressive
  | 'fadeOut'    // Disparition progressive
  | 'slide'      // Glissement
  | 'scale'      // Changement d'échelle
  | 'wave'       // Ondulation
  | 'glitch'     // Effet glitch
  | 'pixelate';  // Pixelisation

// https://www.framer.com/motion/transition/#ease
// https://www.framer.com/motion/transition/#ease
export type EasingDefinition = 
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate';

export type EasingFunction = EasingDefinition | [number, number, number, number];

export interface Attack {
  name: string;
  description: string;
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'special';
  cooldown: number; // en tours
  energyCost: number; // coût en énergie
  // Optionally used in UI for audio preview
  sound?: string;
  
  // Effets
  damage?: number;
  healing?: number;
  statusEffects?: {
    type: StatusEffect;
    duration: number; // en tours
    intensity: number; // puissance de l'effet (1-100)
    chance: number; // probabilité d'application (0-100)
  }[];

  // Animation
  animation?: {
    type: 'image' | 'gif';
    url: string;
    path: Array<{
      x: number;
      y: number;
    }>;
    duration: number;
    easing: EasingDefinition;
    preset: AnimationPreset;
    startScale: number;
    endScale: number;
    startOpacity: number;
    endOpacity: number;
    rotation?: number; // rotation en degrés
  };

  // Son
  audioClip?: {
    url: string;
    startTime: number;
    endTime: number;
    volume: number; // 0-1
    loop: boolean;
  };

  // Conditions d'utilisation
  conditions?: {
    minHealth?: number; // PV minimum requis (0-100)
    maxHealth?: number; // PV maximum requis (0-100)
    minEnergy?: number; // Énergie minimum requise
    statusRequired?: StatusEffect[]; // Effets requis
    statusForbidden?: StatusEffect[]; // Effets interdits
  };
}

export interface BaseStats {
  strength: number;     // Force
  agility: number;     // Agilité
  constitution: number; // Constitution
  intelligence: number; // Intelligence
  intuition: number;   // Intuition
  presence: number;    // Présence
  appearance: number;  // Apparence
}

export interface Stats extends BaseStats {
  displayNames: {
    [K in keyof BaseStats]: string;
  };
}

export interface Rapper {
  id: string;
  name: string;
  type: 'official' | 'ugc';
  // Optionally used in UI for city display
  city?: string;
  // Optionally used in UI for description
  description?: string;
  location: {
    name: string;
    coordinates: [number, number]; // [latitude, longitude]
  };
  images: {
    front: string;
    back?: string;
  };
  stats: Stats;
  attacks: Attack[];
  backstory: string;
  socialLinks?: {
    youtube?: string;
    soundcloud?: string;
    instagram?: string;
    twitter?: string;
  };
  creator?: {
    id: string;
    name: string;
  };
}
