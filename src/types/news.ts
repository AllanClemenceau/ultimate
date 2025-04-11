export type NewsCategory = 
  | 'geopolitique'
  | 'economie'
  | 'technologie'
  | 'sport'
  | 'culture'
  | 'environnement'
  | 'science';

export interface Location {
  lat: number;
  lng: number;
}

export interface NewsMarker {
  id: string;
  position: Location;
  title: string;
  category: NewsCategory;
  description: string;
  imageUrl?: string;
  relatedNewsIds?: string[];
}
