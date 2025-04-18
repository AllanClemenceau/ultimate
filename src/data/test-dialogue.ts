import { MissionDialogue, DialogueSpeaker } from '@/types/dialogue';

const characters: Record<string, DialogueSpeaker> = {
  player: {
    id: 'player',
    name: 'Vous',
    type: 'player',
    avatar: '/images/player-avatar.jpg'
  },
  reporter: {
    id: 'reporter',
    name: 'Journaliste',
    type: 'npc',
    role: 'reporter',
    avatar: '/avatars/reporter.jpg'
  },
  narrator: {
    id: 'narrator',
    name: 'Narrateur',
    type: 'narrator',
    avatar: '/avatars/narrator.jpg'
  },
  rival: {
    id: 'rival',
    name: 'Kai',
    type: 'npc',
    role: 'opponent',
    avatar: '/avatars/kai.jpg'
  }
};

export const testMissionDialogue: MissionDialogue = {
  id: 'test-mission-1',
  newsId: 'news-1',
  title: 'Confrontation au Dojo',
  description: 'Un défi inattendu vous attend au dojo',
  initialDialogueId: 'start',
  hasCombat: true,
  dialogues: {
    start: {
      id: 'start',
      text: 'Vous entrez dans le dojo et trouvez votre rival qui vous attendait. Son regard est déterminé.',
      speaker: characters.rival,
      choices: [
        {
          id: 'choice1',
          text: 'Saluer respectueusement',
          consequences: {
            story: 'Votre respect surprend votre adversaire',
            combat: {
              advantage: 'player',
              description: 'L’adversaire baisse sa garde',
              modifier: {
                type: 'speed',
                value: 1
              }
            }
          },
          nextDialogueId: 'respectful'
        },
        {
          id: 'choice2',
          text: 'Adopter une posture de combat',
          consequences: {
            story: 'Votre rival se met immédiatement en garde',
            combat: {
              advantage: 'opponent',
              description: 'L’adversaire est prêt à contre-attaquer',
              modifier: {
                type: 'defense',
                value: 2
              }
            }
          },
          nextDialogueId: 'aggressive'
        }
      ]
    },
    respectful: {
      id: 'respectful',
      text: 'Je ne m’attendais pas à tant de respect de ta part...',
      speaker: characters.rival,
      isCombatPrelude: true,
      choices: [
        {
          id: 'respectful1',
          text: 'Proposer un combat amical',
          consequences: {
            story: 'Kai accepte votre proposition',
            combat: {
              advantage: 'player',
              description: 'Combat dans un esprit sportif',
              modifier: {
                type: 'damage',
                value: -1
              }
            }
          },
          nextDialogueId: 'combat'
        },
        {
          id: 'respectful2',
          text: 'Profiter de sa surprise',
          consequences: {
            story: 'Vous prenez l’avantage tactique',
            combat: {
              advantage: 'player',
              description: 'Initiative au combat',
              modifier: {
                type: 'speed',
                value: 2
              }
            }
          },
          nextDialogueId: 'mission-complete'
        }
      ]
    },
    aggressive: {
      id: 'aggressive',
      text: 'Votre rival se met immédiatement en garde.',
      speaker: characters.rival,
      isCombatPrelude: true,
      choices: [
        {
          id: 'aggressive1',
          text: 'Lancer un attaque',
          consequences: {
            story: 'Vous lancez une attaque',
            combat: {
              advantage: 'player',
              description: 'Attaque lancée',
              modifier: {
                type: 'damage',
                value: 1
              }
            }
          },
          nextDialogueId: 'combat'
        }
      ]
    },
    combat: {
      id: 'combat',
      text: 'Le combat commence.',
      speaker: characters.narrator,
      isCombat: true,
      choices: []
    },
    'mission-complete': {
      id: 'mission-complete',
      text: "Cette première interaction vous a permis d'en apprendre plus sur la situation...",
      speaker: characters.narrator,
      choices: []
    }
  }
};
