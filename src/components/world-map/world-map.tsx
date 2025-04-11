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

  const createMarkerElement = useCallback((markerData: NewsMarker) => {
    const markerElement = document.createElement('div');
    markerElement.className = 'marker-container';
    markerElement.innerHTML = `
      <div class="marker cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 shadow-lg transform transition-transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `;
    return markerElement;
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
          title: markerData.title,
          content: createMarkerElement(markerData)
        });

        marker.addListener('gmp-click', () => onMarkerClick?.(markerData.id));
        return marker;
      });

      setAdvancedMarkers(newMarkers);

      return () => {
        newMarkers.forEach(marker => marker.map = null);
      };
    }
  }, [map, markers, onMarkerClick, isLoaded, createMarkerElement]);

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
          tilt: 0,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          clickableIcons: false
        }}
        mapContainerClassName="w-full aspect-[16/9] rounded-lg"
      >
        {/* Les marqueurs sont gérés via useEffect */}
      </GoogleMap>
    </div>
  );
}
