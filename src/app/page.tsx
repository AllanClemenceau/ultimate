'use client';

import { RapperGrid } from '@/components/rapper-grid';
import { officialRappers } from '@/data/official-rappers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CreateRapperForm } from '@/components/create-rapper-form';
import { NewsTicker } from '@/components/news-ticker';

import '@fontsource/press-start-2p';

type Mode = 'official' | 'create';

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('official');
  return (
    <main className="min-h-screen p-0 md:p-0 flex flex-col items-center overflow-visible relative bg-#fff">
      <div className="w-full z-10">
        <NewsTicker />
      </div>
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center px-2 md:px-8 pt-8 pb-10">
        {/* Modern Neo-Brutalist Hero/CTA Block */}
        <div className="relative w-full flex flex-col items-center mb-8">
          <div className="bg-#fff border-l-2 border-black rounded-2xl shadow-[0_6px_32px_0_rgba(162,89,255,0.25),0_1.5px_8px_0_rgba(0,0,0,0.5)] px-8 py-4 md:px-16 md:py-8 relative overflow-visible flex flex-col items-center w-full max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-extrabold text-black tracking-tight text-center mb-2" style={{ fontFamily: 'var(--font-modern)' }}>
              Ultimate667
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-black text-center border-b-2 border-[var(--accent-purple)] px-4 py-2 inline-block mb-4" style={{ fontFamily: 'var(--font-modern)' }}>
              Bienvenue dans l'univers Underground – <span className="text-#000">Sélectionne ton héros !</span>
            </p>
            <div className="flex gap-6 mt-2 z-10">
              <button
                onClick={() => setMode('official')}
                className={cn(
                  'px-8 py-4 text-2xl font-extrabold border border-black rounded-md bg-black text-white transition-transform duration-150 hover:scale-105 active:scale-95',
                  mode === 'official' ? 'outline outline-4 outline-[var(--accent-purple)]' : 'opacity-80 hover:opacity-100'
                )}
                style={{ fontFamily: 'var(--font-modern)', boxShadow: '6px 6px 0 0 #000', borderRadius: '0.375rem' }}
              >
                Rappeurs Officiels
              </button>
              <button
                onClick={() => setMode('create')}
                className={cn(
                  'px-8 py-4 text-2xl font-extrabold border border-black rounded-md bg-white text-black transition-transform duration-150 hover:scale-105 active:scale-95',
                  mode === 'create' ? 'outline outline-4 outline-[var(--accent-purple)]' : 'opacity-80 hover:opacity-100'
                )}
                style={{ fontFamily: 'var(--font-modern)', boxShadow: '6px 6px 0 0 #000', borderRadius: '0.375rem' }}
              >
                Crée ton propre Héros
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          {mode === 'official' ? (
            <RapperGrid
              rappers={officialRappers}
              onSelect={(rapper) => {
                if (rapper.id === 'create-hero') {
                  setMode('create');
                  return;
                }
                // Only open the lightbox; do not navigate here
              }}
            />
          ) : (
            <CreateRapperForm
              onComplete={(rapper) => {
                router.push(`/mission?rapperId=${rapper.id}`);
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
