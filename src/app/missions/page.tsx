'use client';

import { useState } from 'react';
import { WorldMap } from '@/components/world-map/world-map';
import { NewsDetails } from '@/components/news/news-details';
import { NewsFilters } from '@/components/news/news-filters';
import type { NewsMarker, NewsCategory } from '@/types/news';
import { useNews } from '@/hooks/use-news';

export default function MissionsPage() {
  const [selectedNews, setSelectedNews] = useState<NewsMarker | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 46.227638, lng: 2.213749 });
  const [mapZoom, setMapZoom] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<NewsCategory[]>([]);

  const { news = [], isLoading, isError, refresh } = useNews(selectedCategories);

  console.log('MissionsPage - News:', { news, isLoading, isError });

  const handleMarkerClick = (newsId: string) => {
    const newsItem = news.find((n: NewsMarker) => n.id === newsId);
    if (newsItem) {
      setSelectedNews(newsItem);
      setDialogOpen(true);
      setMapCenter(newsItem.position);
      setMapZoom(8);
    }
  };

  const handleCategoryToggle = (category: NewsCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  if (isError) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Actualités Mondiales</h1>
        <div className="text-red-500">
          Une erreur est survenue lors du chargement des actualités.
          <button
            onClick={() => refresh()}
            className="ml-2 text-blue-500 hover:underline"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Actualités Mondiales</h1>
      
      {/* Filtres de catégories */}
      <NewsFilters
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
      />
      
      {/* Carte interactive */}
      <div className="mb-8 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="animate-pulse text-lg">Chargement des actualités...</div>
          </div>
        )}
        <WorldMap
          markers={news}
          onMarkerClick={handleMarkerClick}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      {/* Détails de l'actualité */}
      <NewsDetails
        news={selectedNews}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      {/* Message si aucune actualité n'est sélectionnée */}
      {!selectedNews && !dialogOpen && (
        <div className="text-center text-muted-foreground">
          Cliquez sur un marqueur pour voir les détails de l'actualité
        </div>
      )}
    </div>
  );
}
