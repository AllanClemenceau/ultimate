'use client';

import { useState } from 'react';
import { WorldMap } from '@/components/world-map/world-map';
import type { NewsMarker } from '@/types/news';

// Données temporaires pour tester
const mockNews: NewsMarker[] = [
  {
    id: 'news1',
    position: { lat: 48.866667, lng: 2.333333 },
    title: 'Tensions diplomatiques à Paris',
    category: 'geopolitique',
    description: 'Les négociations sur le climat atteignent un point critique lors du sommet international.'
  },
  {
    id: 'news2',
    position: { lat: 40.7128, lng: -74.0060 },
    title: 'Wall Street en effervescence',
    category: 'economie',
    description: 'Une nouvelle technologie bouleverse les marchés financiers traditionnels.'
  },
  {
    id: 'news3',
    position: { lat: 35.6762, lng: 139.6503 },
    title: 'Innovation technologique à Tokyo',
    category: 'technologie',
    description: 'Une startup japonaise dévoile une avancée majeure en intelligence artificielle.'
  },
  {
    id: 'news4',
    position: { lat: 51.5074, lng: -0.1278 },
    title: 'Découverte scientifique à Londres',
    category: 'science',
    description: 'Des chercheurs britanniques font une percée dans la fusion nucléaire.'
  },
  {
    id: 'news5',
    position: { lat: -33.8688, lng: 151.2093 },
    title: 'Alerte environnementale à Sydney',
    category: 'environnement',
    description: 'Un nouveau phénomène climatique inquiète les scientifiques.'
  },
];

export default function MissionsPage() {
  const [selectedNews, setSelectedNews] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 0 });
  const [mapZoom, setMapZoom] = useState(2);

  const handleMarkerClick = (newsId: string) => {
    setSelectedNews(newsId);
    const news = mockNews.find(n => n.id === newsId);
    if (news) {
      setMapCenter(news.position);
      setMapZoom(6);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Actualités Mondiales</h1>
      
      {/* Carte interactive */}
      <div className="mb-8">
        <WorldMap
          markers={mockNews}
          onMarkerClick={handleMarkerClick}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      {/* Détails de l'actualité sélectionnée */}
      {selectedNews && (
        <div className="bg-background/80 backdrop-blur-sm border rounded-lg p-6 shadow-lg">
          {mockNews
            .filter(news => news.id === selectedNews)
            .map(news => (
              <div key={news.id}>
                <h2 className="text-2xl font-bold mb-2">{news.title}</h2>
                <p className="text-muted-foreground">{news.description}</p>
              </div>
            ))
          }
        </div>
      )}

      {/* Message si aucune actualité n'est sélectionnée */}
      {!selectedNews && (
        <div className="text-center text-muted-foreground">
          Cliquez sur un marqueur pour voir les détails de l'actualité
        </div>
      )}
    </div>
  );
}
