export type NewsCategory = 
  | 'geopolitique'
  | 'economie'
  | 'technologie'
  | 'science'
  | 'environnement';

export interface Location {
  lat: number;
  lng: number;
}

export interface NewsMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  category: NewsCategory;
  description: string;
  date: string;
  source: string;
  imageUrl?: string;
  content: string;
  readMoreUrl?: string;
  relatedNewsIds?: string[];
}
