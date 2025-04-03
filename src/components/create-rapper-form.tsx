'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Rapper, BaseStats, Stats, Attack } from '@/types/rapper';
import { AttackList } from './attack-studio/attack-list';

type Step = 'info' | 'stats' | 'attacks' | 'image';

interface CreateRapperFormProps {
  onComplete: (rapper: Rapper) => void;
}

const TOTAL_POINTS = 350;
const MIN_STAT = 25;
const MAX_STAT = 100;

export function CreateRapperForm({ onComplete }: CreateRapperFormProps) {
  const [step, setStep] = useState<Step>('info');
  const [formData, setFormData] = useState<{
    name: string;
    location: string;
    stats: Stats;
    attacks: Partial<Attack>[];
  }>({
    name: '',
    location: '',
    stats: {
      strength: 25,
      agility: 25,
      constitution: 25,
      intelligence: 25,
      intuition: 25,
      presence: 25,
      appearance: 25,
      displayNames: {
        strength: 'Force Brute',
        agility: 'Lean',
        constitution: 'Endurance',
        intelligence: 'Flow',
        intuition: 'Instinct',
        presence: 'Ego',
        appearance: 'Style'
      }
    },
    attacks: []
  });

  const steps: { id: Step; label: string }[] = [
    { id: 'info', label: 'Informations' },
    { id: 'stats', label: 'Stats' },
    { id: 'attacks', label: 'Attaques' },
    { id: 'image', label: 'Image' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Indicateur de progression */}
      <div className="flex justify-between mb-8">
        {steps.map((s, index) => (
          <div
            key={s.id}
            className="flex items-center"
          >
            <div 
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                step === s.id ? 'bg-primary text-primary-foreground' : 'bg-muted',
                index < steps.findIndex(x => x.id === step) && 'bg-primary/50'
              )}
            >
              {index + 1}
            </div>
            <span className="ml-2">{s.label}</span>
            {index < steps.length - 1 && (
              <div className="w-24 h-0.5 mx-4 bg-muted" />
            )}
          </div>
        ))}
      </div>

      {/* Étape 1: Informations de base */}
      {step === 'info' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nom du Rappeur
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 rounded-md border bg-background"
              placeholder="Entrez le nom de votre rappeur"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Ville
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2 rounded-md border bg-background"
              placeholder="D'où vient votre rappeur ?"
            />
          </div>
          <button
            onClick={() => setStep('stats')}
            disabled={!formData.name || !formData.location}
            className="w-full p-2 mt-4 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
          >
            Continuer
          </button>
        </div>
      )}

      {/* Étape 2: Stats */}
      {step === 'stats' && (

        <div className="space-y-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold">Distribuez vos points</h3>
            <p className="text-sm text-muted-foreground">
              {Object.entries(formData.stats)
                .filter(([key]) => key !== 'displayNames')
                .reduce((sum, [_, value]) => sum + (value as number), 0)
              } / {TOTAL_POINTS} points utilisés
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Minimum {MIN_STAT} points par stat
            </p>
          </div>
          
          <div className="grid gap-4">
            {(Object.entries(formData.stats) as [keyof typeof formData.stats, number][])
              .filter(([key]) => key !== 'displayNames')
              .map(([stat, value]) => (
              <div key={stat} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">
                    {formData.stats.displayNames[stat as keyof BaseStats]}
                  </label>
                  <span className="text-sm tabular-nums">{value}</span>
                </div>
                <input
                  type="range"
                  min={MIN_STAT}
                  max={MAX_STAT}
                  value={value}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    const currentTotal = Object.entries(formData.stats)
                      .filter(([key]) => key !== 'displayNames')
                      .reduce((sum, [_, value]) => sum + (value as number), 0);
                    const delta = newValue - (formData.stats[stat as keyof BaseStats] as number);
                    
                    if (currentTotal + delta <= TOTAL_POINTS && newValue >= MIN_STAT && newValue <= MAX_STAT) {
                      setFormData({
                        ...formData,
                        stats: {
                          ...formData.stats,
                          [stat]: newValue
                        }
                      });
                    }
                  }}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep('info')}
              className="flex-1 p-2 bg-muted text-muted-foreground rounded-md"
            >
              Retour
            </button>
            <button
              onClick={() => setStep('attacks')}
              className="flex-1 p-2 bg-primary text-primary-foreground rounded-md"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* Étape 3: Attaques */}
      {step === 'attacks' && (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold">Créez vos attaques</h3>
            <p className="text-sm text-muted-foreground">
              Dessinez les trajectoires et configurez les effets
            </p>
          </div>

          <AttackList
            attacks={formData.attacks}
            onChange={(attacks) => setFormData({ ...formData, attacks })}
          />

          <div className="flex gap-4">
            <button
              onClick={() => setStep('stats')}
              className="flex-1 p-2 bg-muted text-muted-foreground rounded-md"
            >
              Retour
            </button>
            <button
              onClick={() => setStep('image')}
              className="flex-1 p-2 bg-primary text-primary-foreground rounded-md"
              disabled={formData.attacks.length === 0}
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* Étape 4: Image */}
      {step === 'image' && (
        <div className="space-y-4">
          <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <p>Fonctionnalité à venir...</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep('stats')}
              className="flex-1 p-2 bg-muted text-muted-foreground rounded-md"
            >
              Retour
            </button>
            <button
              onClick={() => {
                const newRapper: Rapper = {
                  id: `custom-${Date.now()}`,
                  name: formData.name,
                  type: 'ugc',
                  location: {
                    name: formData.location,
                    coordinates: [0, 0], // À implémenter plus tard
                  },
                  images: {
                    front: 'https://placehold.co/400x600/667/fff.png'
                  },
                  stats: formData.stats,
                  attacks: [], // À implémenter plus tard
                  backstory: '', // À implémenter plus tard
                  socialLinks: {} // À implémenter plus tard
                };
                onComplete(newRapper);
              }}
              className="flex-1 p-2 bg-primary text-primary-foreground rounded-md"
            >
              Créer mon Rappeur
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
