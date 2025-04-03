'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImagePicker({ value, onChange }: ImagePickerProps) {
  const [isBase64, setIsBase64] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onChange(base64);
      setIsBase64(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsBase64(false);
          }}
          placeholder="URL de l'image ou GIF"
          className="flex-1 p-2 bg-background border rounded-md"
        />
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button type="button" variant="outline" asChild>
            <span>Parcourir</span>
          </Button>
        </label>
      </div>

      {value && (
        <div className="relative aspect-square w-32 mx-auto border rounded overflow-hidden">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-contain"
            unoptimized={isBase64}
          />
        </div>
      )}
    </div>
  );
}
