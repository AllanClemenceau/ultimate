'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ImagePicker } from './image-picker';
import type { Attack, AnimationPreset, EasingDefinition } from '@/types/rapper';
import { Button } from '@/components/ui/button';

interface Point {
  x: number;
  y: number;
}

interface AttackStudioProps {
  attack?: Partial<Attack>;
  onSave: (attack: Partial<Attack>) => void;
  autoPreview?: boolean;
  initialAttack?: Partial<Attack>;
}

export function AttackStudio({ attack, onSave, autoPreview = true, initialAttack }: AttackStudioProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [path, setPath] = useState<Point[]>([]);
  const [preview, setPreview] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<AnimationPreset>('slide');
  const [selectedEasing, setSelectedEasing] = useState<EasingDefinition>('backOut');
  const [duration, setDuration] = useState(1000);
  const [startScale, setStartScale] = useState(100);
  const [endScale, setEndScale] = useState(100);
  const [startOpacity, setStartOpacity] = useState(100);
  const [endOpacity, setEndOpacity] = useState(100);
  const [animationType, setAnimationType] = useState<'image' | 'gif'>('image');
  const [imageUrl, setImageUrl] = useState('');

  // Gestion du dessin sur le canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le chemin
    if (path.length > 0) {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = '#ff3e00';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Dessiner les points de contrôle
      ctx.fillStyle = '#ff3e00';
      ctx.beginPath();
      ctx.arc(path[0].x, path[0].y, 5, 0, Math.PI * 2);
      ctx.fill();
      if (path.length > 1) {
        ctx.beginPath();
        ctx.arc(path[path.length - 1].x, path[path.length - 1].y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [path]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPath([{ x, y }]);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPath((prev) => [...prev, { x, y }]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handlePreview = () => {
    if (path.length < 2 || isAnimating) return;
    setPreview(true);
    setIsAnimating(true);
  };

  // Nouvelle fonction pour sauvegarder l'attaque
  const handleSaveAttack = () => {
    if (path.length < 2) return;

    const canvasWidth = canvasRef.current?.width || 1;
    const canvasHeight = canvasRef.current?.height || 1;

    const attackData: Partial<Attack> = {
      animation: {
        type: animationType,
        url: imageUrl,
        path: path.map(point => ({
          x: (point.x / canvasWidth) * 200 - 100,
          y: (point.y / canvasHeight) * 200 - 100
        })),
        duration,
        easing: selectedEasing,
        preset: selectedPreset,
        startScale: startScale / 100,
        endScale: endScale / 100,
        startOpacity: startOpacity / 100,
        endOpacity: endOpacity / 100
      }
    };

    onSave(attackData);
  };

  return (
    <div className="p-4 bg-background rounded-lg shadow-lg relative grid grid-cols-[1fr,400px] gap-4 min-h-[600px]">
      {/* Colonne de gauche : Édition */}
      <div className="space-y-4">
        {/* Zone de dessin */}
        <div className="relative bg-card rounded-lg overflow-hidden border border-border">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full h-full"
          />
        </div>

        <div className="flex justify-between gap-4">
          <Button
            onClick={handlePreview}
            className="flex-1"
            disabled={path.length < 2 || isAnimating}
          >
            {isAnimating ? 'Animation en cours...' : 'Prévisualiser'}
          </Button>
          <Button
            onClick={handleSaveAttack}
            className="flex-1"
            disabled={path.length < 2}
            variant="secondary"
          >
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Colonne de droite : Prévisualisation */}
      <div className="flex flex-col gap-4">
        {/* Zone de prévisualisation style Pokémon */}
        <div className="relative bg-[#1a1b1e] rounded-lg overflow-hidden border border-border flex-1">
          <div className="aspect-video relative bg-gradient-to-b from-blue-500/20 to-purple-500/20 sticky top-0">
            {/* Grille de fond */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />

            {/* Animation */}
            {preview && path.length >= 2 && (
              <motion.div
                key={`preview-${Date.now()}`}
                className={`absolute w-8 h-8 z-20 ${!imageUrl ? 'bg-primary rounded-full' : ''}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ 
                  x: -150 + (path[0].x / 400) * 300,
                  y: -100 + (path[0].y / 400) * 200
                }}
                animate={{
                  x: path.map(p => -150 + (p.x / 400) * 300),
                  y: path.map(p => -100 + (p.y / 400) * 200)
                }}
                transition={{
                  duration: duration / 1000,
                  ease: selectedEasing,
                  times: path.map((_, i) => i / (path.length - 1))
                }}
                onAnimationComplete={() => {
                  setPreview(false);
                  setIsAnimating(false);
                }}
              >
                <motion.div
                  className="w-full h-full relative"
                  initial={{
                    scale: startScale / 100,
                    opacity: startOpacity / 100
                  }}
                  animate={{
                    x: selectedPreset === 'shake' ? [-10, 10, -10, 10, 0] : 0,
                    scale: selectedPreset === 'bounce' ? [startScale / 100, (startScale / 100) * 1.2, endScale / 100] :
                           endScale / 100,
                    rotate: selectedPreset === 'spin' ? [0, 180, 360] : 0,
                    opacity: selectedPreset === 'flash' ? [startOpacity / 100, 0, endOpacity / 100] :
                            selectedPreset === 'fade' ? [startOpacity / 100, (startOpacity + endOpacity) / 200, endOpacity / 100] :
                            endOpacity / 100
                  }}
                  transition={{
                    duration: selectedPreset === 'shake' ? 0.5 : 1,
                    repeat: selectedPreset === 'shake' ? 2 : 0,
                    ease: 'easeInOut'
                  }}
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt="Animation"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  )}
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Contrôles d'animation */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Preset
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value as AnimationPreset)}
              className="w-full p-2 mt-1 bg-background border rounded-md"
            >
              <option value="slide">Slide</option>
              <option value="bounce">Bounce</option>
              <option value="spin">Spin</option>
              <option value="shake">Shake</option>
              <option value="flash">Flash</option>
              <option value="fade">Fade</option>
            </select>
          </label>

          <label className="text-sm font-medium">
            Easing
            <select
              value={selectedEasing}
              onChange={(e) => setSelectedEasing(e.target.value as EasingDefinition)}
              className="w-full p-2 mt-1 bg-background border rounded-md"
            >
              <option value="linear">Linear</option>
              <option value="easeIn">Ease In</option>
              <option value="easeOut">Ease Out</option>
              <option value="easeInOut">Ease In Out</option>
              <option value="circIn">Circ In</option>
              <option value="circOut">Circ Out</option>
              <option value="circInOut">Circ In Out</option>
              <option value="backIn">Back In</option>
              <option value="backOut">Back Out</option>
              <option value="backInOut">Back In Out</option>
              <option value="anticipate">Anticipate</option>
            </select>
          </label>

          <label className="text-sm font-medium">
            Durée (ms)
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              min={100}
              max={5000}
              step={100}
              className="w-full p-2 mt-1 bg-background border rounded-md"
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Type d'animation
            <select
              value={animationType}
              onChange={(e) => setAnimationType(e.target.value as 'image' | 'gif')}
              className="w-full p-2 mt-1 bg-background border rounded-md"
            >
              <option value="image">Image</option>
              <option value="gif">GIF</option>
            </select>
          </label>

          <ImagePicker value={imageUrl} onChange={setImageUrl} />

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block">
                Opacité début (%)
                <input
                  type="range"
                  value={startOpacity}
                  onChange={(e) => setStartOpacity(parseInt(e.target.value))}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">{startOpacity}%</span>
              </label>
            </div>

            <div>
              <label className="text-sm font-medium block">
                Opacité fin (%)
                <input
                  type="range"
                  value={endOpacity}
                  onChange={(e) => setEndOpacity(parseInt(e.target.value))}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">{endOpacity}%</span>
              </label>
            </div>

            <div>
              <label className="text-sm font-medium block">
                Échelle début (%)
                <input
                  type="range"
                  value={startScale}
                  onChange={(e) => setStartScale(parseInt(e.target.value))}
                  min={10}
                  max={300}
                  step={1}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">{startScale}%</span>
              </label>
            </div>

            <div>
              <label className="text-sm font-medium block">
                Échelle fin (%)
                <input
                  type="range"
                  value={endScale}
                  onChange={(e) => setEndScale(parseInt(e.target.value))}
                  min={10}
                  max={300}
                  step={1}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">{endScale}%</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
