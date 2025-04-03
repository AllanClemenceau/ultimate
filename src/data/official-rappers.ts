import { Rapper } from '@/types/rapper';

export const officialRappers: Rapper[] = [
  {
    id: 'freeze-corleone',
    name: 'Freeze Corleone',
    type: 'official',
    location: {
      name: 'Paris',
      coordinates: [48.8566, 2.3522],
    },
    images: {
      front: 'https://placehold.co/400x600/667/fff.png',
    },
    stats: {
      strength: 80,
      agility: 90,
      constitution: 75,
      intelligence: 75,
      intuition: 70,
      presence: 85,
      appearance: 85,
      displayNames: {
        strength: 'Force Brute',
        agility: 'Lean',
        constitution: 'Endurance',
        intelligence: 'Flow',
        intuition: 'Instinct',
        presence: 'Ego',
        appearance: 'Style'
      },
    },
    attacks: [
      {
        name: 'Desiigner Flow',
        type: 'Damage',
        cooldown: 3,
      },
      {
        name: 'Hors Ligne',
        type: 'Buff',
        cooldown: 4,
      },
    ],
    backstory: 'Leader du collectif 667, Freeze Corleone est connu pour ses punchlines complexes et ses références historiques.',
    socialLinks: {
      youtube: 'https://youtube.com/freezecorleone',
      instagram: 'https://instagram.com/freezecorleone',
    },
  },
  {
    id: 'zuukou-mayzie',
    name: 'Zuukou Mayzie',
    type: 'official',
    location: {
      name: 'Paris',
      coordinates: [48.8566, 2.3522],
    },
    images: {
      front: 'https://placehold.co/400x600/667/fff?text=Zuukou+Mayzie',
    },
    stats: {
      strength: 92,
      agility: 95,
      constitution: 85,
      intelligence: 95,
      intuition: 85,
      presence: 90,
      appearance: 88,
      displayNames: {
        strength: 'Force Brute',
        agility: 'Lean',
        constitution: 'Endurance',
        intelligence: 'Flow',
        intuition: 'Instinct',
        presence: 'Ego',
        appearance: 'Style'
      },
    },
    attacks: [
      {
        name: 'Mayzie Flow',
        type: 'Damage',
        cooldown: 3,
      },
      {
        name: 'Zuukou Style',
        type: 'Buff',
        cooldown: 4,
      },
    ],
    backstory: 'Membre clé du collectif 667, Zuukou Mayzie est reconnu pour son style unique et ses flows innovants.',
    socialLinks: {
      youtube: 'https://youtube.com/zuukoumayzie',
      instagram: 'https://instagram.com/zuukoumayzie',
    },
  },
];
