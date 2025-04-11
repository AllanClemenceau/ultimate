'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// Définir les bibliothèques en dehors du composant pour éviter les recréations
const libraries = ['marker'] as ['marker'];

// Note: Map styling is now controlled via Google Cloud Console using mapId

const defaultCenter = {
  lat: 48.866667,
  lng: 2.333333
};

interface Location {
  lat: number;
  lng: number;
}

interface NewsMarker {
  id: string;
  position: Location;
  title: string;
}

interface WorldMapProps {
  markers?: NewsMarker[];
  onMarkerClick?: (markerId: string) => void;
  center?: Location;
  zoom?: number;
}

export function WorldMap({ 
  markers = [], 
  onMarkerClick,
  center = defaultCenter,
  zoom = 4 
}: WorldMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
    mapIds: ['ultimate_news_map']
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [advancedMarkers, setAdvancedMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && isLoaded && window.google) {
      // Nettoyer les marqueurs existants
      advancedMarkers.forEach(marker => marker.map = null);
      
      // Créer les nouveaux marqueurs
      const newMarkers = markers.map(markerData => {
        const { AdvancedMarkerElement } = google.maps.marker;
        const marker = new AdvancedMarkerElement({
          map,
          position: markerData.position,
          title: markerData.title
        });

        marker.addEventListener('gmp-click', () => onMarkerClick?.(markerData.id));
        return marker;
      });

      setAdvancedMarkers(newMarkers);

      return () => {
        newMarkers.forEach(marker => marker.map = null);
      };
    }
  }, [map, markers, onMarkerClick, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="w-full aspect-[16/9] bg-background animate-pulse rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Chargement de la carte...</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border shadow-xl">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true,
          mapId: 'ultimate_news_map',
          backgroundColor: '#1d2c4d',
          tilt: 0
        }}
        mapContainerClassName="w-full aspect-[16/9] rounded-lg"
      >
        {/* Les marqueurs sont gérés via useEffect */}
      </GoogleMap>
    </div>
  );
}
