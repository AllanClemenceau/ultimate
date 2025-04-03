'use client';

import { RapperGrid } from '@/components/rapper-grid';
import { officialRappers } from '@/data/official-rappers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CreateRapperForm } from '@/components/create-rapper-form';

type Mode = 'official' | 'create';

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('official');
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Ultimate667</h1>
      <p className="text-xl mb-4">
        Bienvenue dans l&apos;univers Underground
      </p>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Sélectionnez votre Rappeur</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => setMode('official')}
            className={cn(
              'p-4 text-center rounded-lg transition-colors',
              mode === 'official'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-primary/90 hover:text-primary-foreground'
            )}
          >
            Rappeurs Officiels
          </button>
          <button
            onClick={() => setMode('create')}
            className={cn(
              'p-4 text-center rounded-lg transition-colors',
              mode === 'create'
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-muted hover:bg-secondary/90 hover:text-secondary-foreground'
            )}
          >
            Jouer son propre Rappeur
          </button>
        </div>
        
        {mode === 'official' ? (
          <RapperGrid
            rappers={officialRappers}
            onSelect={(rapper) => {
              // Naviguer vers la page de mission avec l'ID du rappeur
              router.push(`/mission?rapperId=${rapper.id}`);
            }}
          />
        ) : (
          <CreateRapperForm 
            onComplete={(rapper) => {
              // Naviguer vers la page de mission avec l'ID du rappeur créé
              router.push(`/mission?rapperId=${rapper.id}`);
            }}
          />
        )}
      </div>
    </main>
  );
}
