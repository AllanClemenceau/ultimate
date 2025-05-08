"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { AttackPreview } from "@/components/attack-studio/attack-preview";
import type { Rapper } from "@/types/rapper";
import Image from "next/image";

interface RapperLightboxProps {
  rapper: Rapper | null;
  open: boolean;
  onClose: () => void;
}

import { useRouter } from 'next/navigation';

export function RapperLightbox({ rapper, open, onClose }: RapperLightboxProps) {
  const router = useRouter();
  if (!rapper) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-3xl w-full p-0 border border-black bg-white h-[80vh] max-h-[80vh] flex flex-col items-center justify-center shadow-[6px_6px_0_0_#000] rounded-2xl"
        style={{ boxShadow: "6px 6px 0 0 #000" }}
      >
        <motion.div layoutId={`rapper-${rapper.id}`} className="overflow-y-auto max-h-[calc(80vh-64px)] w-full p-6 rounded-2xl border-none flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center md:w-1/2 w-full p-6">
            <div className="relative w-48 h-64 md:w-64 md:h-80 border border-black bg-gray-100">
              {/* Robust image rendering: fallback to <img> if <Image> fails or src is not a string */}
              {typeof rapper?.images?.front === 'string' && rapper.images.front ? (
                <Image
                  src={rapper.images.front}
                  alt={rapper.name}
                  fill
                  className="object-cover"
                  style={{ borderRadius: 0 }}
                  priority
                  onError={(e: any) => {
                    // fallback to placeholder if error
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x600/eee/222?text=No+Image';
                  }}
                />
              ) : (
                <img
                  src="https://placehold.co/400x600/eee/222?text=No+Image"
                  alt="No image"
                  className="object-cover w-full h-full"
                  style={{ borderRadius: 0, objectFit: 'cover' }}
                />
              )}
            </div>
            <div className="mt-4 text-lg font-bold text-black text-center">
              {/* TS-safe city fallback */}
              {typeof rapper?.city === 'string' && rapper.city ? (
                <span className="block">{rapper.city}</span>
              ) : (
                <span className="block text-gray-400">Ville inconnue</span>
              )}
            </div>
          </div>
          {/* Right: Info */}
          <div className="flex-1 flex flex-col p-6 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-black mb-2" style={{ fontFamily: 'var(--font-modern)' }}>{rapper.name}</h2>
              {/* TS-safe description fallback */}
              <p className="text-base text-black font-bold mb-2">{typeof rapper?.description === 'string' && rapper.description ? rapper.description : 'Aucune description.'}</p>
            </div>
            {/* Stats */}
            {(() => {
              function isPlainObject(val: any): val is Record<string, unknown> {
                return (
                  typeof val === 'object' &&
                  val !== null &&
                  !Array.isArray(val) &&
                  Object.prototype.toString.call(val) === '[object Object]'
                );
              }
              if (isPlainObject(rapper.stats)) {
                return (
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Stats</h3>
                    <div className="flex flex-col gap-2">
                      {Object.entries(rapper.stats)
  .filter(([_, value]) => typeof value === 'number' || typeof value === 'string')
  .map(([stat, value]) => (
    <div key={stat} className="flex items-center gap-2">
      <span className="w-24 capitalize font-semibold text-black">{stat}</span>
      <div className="flex-1 h-3 bg-gray-200 border border-black relative">
        <div
          className="h-3 bg-black"
          style={{ width: `${Math.max(0, Math.min(100, Number(value)))}%` }}
        />
      </div>
      <span className="w-8 text-black font-bold text-right">{value}</span>
    </div>
  ))}
                    </div>
                  </div>
                );
              }
              return (
                <div className="mb-4 text-gray-400 font-bold">Aucune statistique disponible.</div>
              );
            })()}
            {/* Attacks */}
            {rapper.attacks && rapper.attacks.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Attaques</h3>
                <div className="flex flex-col gap-4">
                  {rapper.attacks.map((attack, idx) => (
                    <div
                      key={attack.name + idx}
                      className="border border-black p-4 bg-white"
                      style={{ boxShadow: '3px 3px 0 0 #000', borderRadius: 0 }}
                    >
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex-1">
                          <div className="font-extrabold text-black text-xl mb-1">{attack.name}</div>
                          <div className="text-black mb-1 text-sm">{attack.description}</div>
                          <div className="text-xs font-bold text-black mb-2">Type: {attack.type}</div>
                          {/* TS-safe sound: only render if string */}
                          {typeof attack?.sound === 'string' && attack.sound ? (
                            <audio controls className="w-full mb-2">
                              <source src={attack.sound} />
                              Your browser does not support the audio element.
                            </audio>
                          ) : null}
                        </div>
                        <div className="md:w-48 w-full">
                          <AttackPreview attack={attack} autoPlay={true} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
        <div className="w-full flex justify-center mt-4">
          <button
            className="w-full px-8 py-3 bg-black text-white font-bold text-lg border border-black shadow-[3px_3px_0_0_#000] hover:bg-gray-900 transition-all rounded-2xl"
            onClick={() => router.push('/missions')}
          >
            Choisir ce héros
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
