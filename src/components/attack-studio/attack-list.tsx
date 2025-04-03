'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Attack } from '@/types/rapper';
import { AttackDialog } from './attack-dialog';
import { AttackPreview } from './attack-preview';

interface AttackListProps {
  attacks: Partial<Attack>[];
  onChange: (attacks: Partial<Attack>[]) => void;
  maxAttacks?: number;
}

export function AttackList({ attacks, onChange, maxAttacks = 4 }: AttackListProps) {
  const [editingAttack, setEditingAttack] = useState<{ attack: Partial<Attack>, index: number } | null>(null);
  const [selectedType, setSelectedType] = useState<Attack['type']>('damage');
  const [attackName, setAttackName] = useState('');
  const [attackDescription, setAttackDescription] = useState('');
  const [energyCost, setEnergyCost] = useState(10);

  const handleSaveAttack = (index: number, animation: Partial<Attack>) => {
    const newAttacks = [...attacks];
    newAttacks[index] = {
      ...newAttacks[index],
      name: attackName,
      description: attackDescription,
      type: selectedType,
      energyCost,
      ...animation,
    };
    onChange(newAttacks);
    setEditingAttack(null);
    // Reset form
    setAttackName('');
    setAttackDescription('');
    setSelectedType('damage');
    setEnergyCost(10);
  };

  const handleUpdate = (index: number, newAttack: Partial<Attack>) => {
    const newAttacks = [...attacks];
    newAttacks[index] = newAttack;
    onChange(newAttacks);
    setEditingAttack(null);
  };

  const handleAddAttack = () => {
    if (attacks.length >= maxAttacks) return;
    setEditingAttack({ attack: {}, index: attacks.length });
    onChange([...attacks, {}]);
  };

  const handleDeleteAttack = (index: number) => {
    const newAttacks = attacks.filter((_, i) => i !== index);
    onChange(newAttacks);
  };

  return (
    <div className="space-y-4">
      {/* Liste des attaques */}
      <div className="grid grid-cols-2 gap-4">
        {attacks.map((attack, index) => (
          <div key={index} className="relative p-4 bg-card rounded-lg border overflow-hidden">
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{attack.name || 'Nouvelle attaque'}</h3>
                <p className="text-sm text-muted-foreground">{attack.description || 'Aucune description'}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Type: {attack.type || 'damage'}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setEditingAttack({ attack, index })}
                    className="text-sm text-primary hover:underline"
                  >
                    Modifier
                  </Button>
                </div>
                <div className="h-40 bg-background rounded relative overflow-hidden">
                  {attack.animation && <div
                    className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm"
                  >
                    Cliquez sur Modifier pour voir la prévisualisation
                  </div>}
                  {!attack.animation && attack.name && <AttackPreview attack={attack as Attack} />}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Cooldown: {attack.cooldown || 0} tours</span>
                  <span>Énergie: {attack.energyCost || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog d'édition */}
      <AttackDialog
        open={editingAttack !== null}
        onOpenChange={(open) => {
          if (!open) setEditingAttack(null);
        }}
        attack={editingAttack?.attack}
        onSave={(newAttack) => {
          if (editingAttack) {
            handleUpdate(editingAttack.index, newAttack);
          }
        }}
      />

      {/* Bouton d'ajout */}
      {attacks.length < maxAttacks && (
        <Button
          onClick={() => setEditingAttack({ attack: {}, index: attacks.length })}
          className="mt-4 w-full"
          variant="outline"
        >
          Ajouter une attaque
        </Button>
      )}
    </div>
  );
}
