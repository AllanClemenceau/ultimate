// Animated News Ticker Banner for Demo Content
'use client';
import { useEffect, useRef, useState } from 'react';

const DEMO_HEADLINES = [
  "🔥 Gilets Jaunes occupent la Place de la République !",
  "🚀 Freeze Corleone droppe un nouveau son sur l'actu !",
  "😈 Paris sous tension : Battle de punchlines en direct !",
  "💯 667 annonce une tournée secrète dans toute la France !",
  "🥶 Banlieues en feu : le rap s'invite dans les débats !",
  "🧃 Nouveau mode de jeu : crée ton propre rappeur !",
  "🎤 Les news les plus chaudes, remixées façon street !",
  "🖤 Underground culture meets breaking news."
];

export function NewsTicker() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % DEMO_HEADLINES.length);
    }, 3500);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="w-full z-20">
      <div className="w-full flex items-center justify-center bg-black border border-black py-3 px-2 overflow-visible" style={{ width: '100%', borderRadius: 0, boxShadow: 'none' }}>
        <span className="text-white font-bold text-lg md:text-xl tracking-widest whitespace-nowrap" style={{ width: '100%', fontFamily: 'var(--font-modern)' }}>
          {DEMO_HEADLINES[index]}
        </span>
      </div>
    </div>
  );
}

// Add the following CSS to global styles (globals.css):
// .animate-marquee {
//   display: inline-block;
//   animation: marquee 20s linear infinite;
// }
// @keyframes marquee {
//   0% { transform: translateX(100%); }
//   100% { transform: translateX(-100%); }
// }
// .animate-slideIn {
//   animation: slideIn 0.7s cubic-bezier(0.23, 1, 0.32, 1);
// }
// @keyframes slideIn {
//   0% { transform: translateY(-60%); opacity: 0; }
//   100% { transform: translateY(0); opacity: 1; }
// }
