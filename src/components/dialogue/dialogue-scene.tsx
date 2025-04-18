'use client';

import { useState, useEffect } from 'react';
import { DialogueBox } from './dialogue-box';
import { ChoiceList } from './choice-list';
import { DialogueNode, DialogueChoice, MissionDialogue, CombatImpact } from '@/types/dialogue';
import { cn } from '@/lib/utils';

interface DialogueSceneProps {
  mission: MissionDialogue;
  onComplete: (combatAdvantages: CombatImpact[]) => void;
  className?: string;
}

export function DialogueScene({
  mission,
  onComplete,
  className
}: DialogueSceneProps) {
  const [currentDialogue, setCurrentDialogue] = useState<DialogueNode | undefined>();
  const [combatAdvantages, setCombatAdvantages] = useState<CombatImpact[]>([]);
  const [isDialogueComplete, setIsDialogueComplete] = useState(false);
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    // Initialiser le dialogue
    const initialDialogue = mission.dialogues[mission.initialDialogueId];
    setCurrentDialogue(initialDialogue);
  }, [mission]);

  const handleDialogueComplete = () => {
    setShowChoices(true);
  };

  const handleChoiceSelect = (choice: DialogueChoice) => {
    // Ajouter l'impact sur le combat si présent
    if (choice.consequences.combat) {
      setCombatAdvantages((prev: CombatImpact[]) => [...prev, choice.consequences.combat!]);
    }

    // Passer au dialogue suivant
    const nextDialogue = mission.dialogues[choice.nextDialogueId];
    if (nextDialogue) {
      setCurrentDialogue(nextDialogue);
      setShowChoices(false);
    } else {
      // Fin du dialogue
      setIsDialogueComplete(true);
      onComplete(combatAdvantages);
    }
  };

  if (!currentDialogue) return null;

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {currentDialogue.background && (
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${currentDialogue.background})` }}
        />
      )}
      
      <div className="relative z-10 flex flex-col gap-6">
        <DialogueBox
          dialogue={currentDialogue}
          onComplete={handleDialogueComplete}
          className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        />

        {showChoices && !isDialogueComplete && (
          <ChoiceList
            choices={currentDialogue.choices}
            onSelect={handleChoiceSelect}
            className="space-y-3"
          />
        )}

        {currentDialogue.isCombatPrelude && combatAdvantages.length > 0 && (
          <div className="fixed top-6 right-6">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-foreground">
                Avantages de Combat
              </h3>
              <div className="space-y-2">
                {combatAdvantages.map((impact: CombatImpact, index: number) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg bg-background/20 backdrop-blur-sm"
                  >
                    <span className="text-sm text-foreground/90">
                      {impact.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
