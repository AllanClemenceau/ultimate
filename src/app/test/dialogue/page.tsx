'use client';

import { useState } from 'react';
import { DialogueScene } from '@/components/dialogue/dialogue-scene';
import { testMissionDialogue } from '@/data/test-dialogue';
import { CombatImpact } from '@/types/dialogue';
import '@fontsource-variable/inter';

export default function TestDialoguePage() {
  const [gameComplete, setGameComplete] = useState(false);
  const [combatAdvantages, setCombatAdvantages] = useState<CombatImpact[]>([]);

  const handleComplete = (advantages: CombatImpact[]) => {
    setGameComplete(true);
    setCombatAdvantages(advantages);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="container mx-auto max-w-4xl">
        {!gameComplete ? (
          <div className="space-y-6">
            <DialogueScene
              mission={testMissionDialogue}
              onComplete={handleComplete}
            />
          </div>
        ) : (
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mission Terminée ! 🎉
            </h2>
            {combatAdvantages.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Avantages de Combat Accumulés
                </h3>
                <div className="grid gap-4">
                  {combatAdvantages.map((advantage, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col gap-2 p-4 rounded-lg bg-background/50 backdrop-blur-sm shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {advantage.advantage === 'player' && '⚔️ Avantage'}
                          {advantage.advantage === 'opponent' && '⚠️ Désavantage'}
                          {advantage.advantage === 'none' && '⚖️ Neutre'}
                        </span>
                        {advantage.modifier && (
                          <span className="text-xs bg-accent/10 px-2 py-0.5 rounded text-accent-foreground">
                            {advantage.modifier.type}: 
                            {advantage.modifier.value > 0 ? '+' : ''}
                            {advantage.modifier.value}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {advantage.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-8 w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-3 font-medium transition-colors"
            >
              Rejouer la Mission
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
