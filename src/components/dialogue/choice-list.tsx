'use client';

import { DialogueChoice } from '@/types/dialogue';
import { cn } from '@/lib/utils';

interface ChoiceListProps {
  choices: DialogueChoice[];
  onSelect: (choice: DialogueChoice) => void;
  className?: string;
}

export function ChoiceList({ choices, onSelect, className }: ChoiceListProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onSelect(choice)}
          className={cn(
            'w-full text-left p-4 rounded-lg transition-all duration-200',
            'hover:shadow-lg hover:-translate-y-1 active:translate-y-0',
            'focus:outline-none focus:ring-2 focus:ring-primary/20',
            'bg-card hover:bg-card/90 text-card-foreground'
          )}
        >
          <div className="flex flex-col gap-2">
            <span className="font-medium">{choice.text}</span>
            {choice.consequences.story && (
              <span className="text-sm text-muted-foreground">
                {choice.consequences.story}
              </span>
            )}
            {choice.consequences.combat && (
              <div className="text-sm text-accent-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="font-medium">
                    {choice.consequences.combat.advantage === 'player' && ' Avantage'}
                    {choice.consequences.combat.advantage === 'opponent' && ' Désavantage'}
                    {choice.consequences.combat.advantage === 'none' && ' Neutre'}
                  </span>
                  {choice.consequences.combat.modifier && (
                    <span className="text-xs bg-accent/10 px-2 py-0.5 rounded">
                      {choice.consequences.combat.modifier.type}: 
                      {choice.consequences.combat.modifier.value > 0 ? '+' : ''}
                      {choice.consequences.combat.modifier.value}
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
