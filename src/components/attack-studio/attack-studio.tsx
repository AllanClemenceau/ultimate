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
  const [preview, setPreview] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<AnimationPreset>('slide');
  const [selectedEasing, setSelectedEasing] = useState<EasingDefinition>('backOut');
  const [duration, setDuration] = useState(1000);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
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
    if (path.length < 2) return;
    setPreview(true);
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
        scale,
        opacity
      }
    };

    onSave(attackData);
  };

  const getAnimationData = () => {
    if (path.length < 2) return null;

    const start = path[0];
    const end = path[path.length - 1];
    const canvasWidth = canvasRef.current?.width || 1;
    const canvasHeight = canvasRef.current?.height || 1;

    return {
      type: animationType,
      url: imageUrl,
      startPoint: {
        x: (start.x / canvasWidth) * 200 - 100,
        y: (start.y / canvasHeight) * 200 - 100
      },
      endPoint: {
        x: (end.x / canvasWidth) * 200 - 100,
        y: (end.y / canvasHeight) * 200 - 100
      },
      duration,
      easing: selectedEasing,
      preset: selectedPreset,
      scale,
      opacity
    };
  };

  return (
    <div className="p-4 bg-background rounded-lg shadow-lg relative">
      <div className="space-y-4">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="border border-border rounded-lg bg-card relative z-10"
          />
          
          {/* Prévisualisation de l'animation */}
          {preview && path.length >= 2 && (
            <motion.div
              key={`preview-${Date.now()}`}
              className={`absolute w-8 h-8 z-20 ${!imageUrl ? 'bg-primary rounded-full' : ''}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate(${path[0].x - 16}px, ${path[0].y - 16}px)`,
                transformOrigin: 'center'
              }}
              initial={{ 
                x: 0,
                y: 0,
                scale: scale,
                opacity: opacity
              }}
              animate={{
                x: path.map(p => p.x - path[0].x),
                y: path.map(p => p.y - path[0].y),
                scale: scale,
                opacity: opacity
              }}
              transition={{
                duration: duration / 1000,
                ease: selectedEasing,
                repeat: 0,
                times: path.map((_, i) => i / (path.length - 1))
              }}
              onAnimationComplete={() => setPreview(false)}
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
          )}
        </div>

        <div className="flex justify-between gap-4">
          <Button
            onClick={handlePreview}
            className="flex-1"
            disabled={path.length < 2}
          >
            Prévisualiser
          </Button>
          <Button
            onClick={handleSaveAttack}
            className="flex-1"
            disabled={path.length < 2}
          >
            Sauvegarder
          </Button>
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

            <label className="text-sm font-medium">
              Opacité
              <input
                type="range"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">{opacity}</span>
            </label>

            <label className="text-sm font-medium">
              Échelle
              <input
                type="range"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                min={0.1}
                max={3}
                step={0.1}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">×{scale}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
