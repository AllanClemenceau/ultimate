'use client';

import { NewsMarker } from '@/types/news';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface NewsDetailsProps {
  news: NewsMarker | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryColors = {
  geopolitique: 'bg-red-500',
  economie: 'bg-green-500',
  technologie: 'bg-blue-500',
  science: 'bg-purple-500',
  environnement: 'bg-emerald-500',
} as const;

export function NewsDetails({ news, open, onOpenChange }: NewsDetailsProps) {
  if (!news) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="sr-only">{news.title}</DialogTitle>
        <DialogDescription className="sr-only">{news.description}</DialogDescription>
        {news.imageUrl && (
          <div className="relative w-full h-48 -mt-6 -mx-6 mb-4 overflow-hidden rounded-t-lg">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{news.title}</h2>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <time dateTime={news.date}>
                  {format(new Date(news.date), 'PPP', { locale: fr })}
                </time>
                <span>•</span>
                <span>{news.source}</span>
              </div>
            </div>
            <Badge variant="secondary" className={categoryColors[news.category]}>
              {news.category}
            </Badge>
          </div>

          <p className="text-lg leading-relaxed">{news.description}</p>
          
          <div className="prose prose-neutral dark:prose-invert">
            {news.content}
          </div>

          {news.readMoreUrl && (
            <div className="pt-4 flex justify-end">
              <Button asChild variant="outline">
                <a 
                  href={news.readMoreUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Lire la suite
                  <ExternalLink size={16} />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
