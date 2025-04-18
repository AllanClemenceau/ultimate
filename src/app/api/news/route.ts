import { NextResponse } from 'next/server';
import { NewsCategory, NewsMarker } from '@/types/news';
import { NewsCache } from '@/utils/news-cache';

interface NewsAPIArticle {
  url: string;
  title: string;
  description: string | null;
  content: string | null;
  publishedAt: string;
  source: { name: string };
  urlToImage: string | null;
  category?: string;
}

interface NewsAPIResponse {
  status: string;
  articles: NewsAPIArticle[];
  message?: string;
}

const categoryMapping = {
  politics: 'geopolitique',
  business: 'economie',
  technology: 'technologie',
  science: 'science',
  environment: 'environnement',
} as const;

// Fonction pour obtenir une position aléatoire en France
const getRandomFrenchPosition = () => {
  // Limites approximatives de la France métropolitaine
  const bounds = {
    north: 51.089167, // Latitude max
    south: 41.342778, // Latitude min
    east: 9.560833,   // Longitude max
    west: -4.795556,  // Longitude min
  };

  return {
    lat: bounds.south + Math.random() * (bounds.north - bounds.south),
    lng: bounds.west + Math.random() * (bounds.east - bounds.west),
  };
};

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const categoriesParam = searchParams.get('categories');
    const categories = categoriesParam ? categoriesParam.split(',') as NewsCategory[] : [];

    // Vérifier le cache d'abord
    const cachedData = await NewsCache.getData();
    if (cachedData) {
      console.log('Returning cached news data');
      if (categories.length > 0) {
        const filteredData = cachedData.filter(news => categories.includes(news.category));
        return NextResponse.json(filteredData);
      }
      return NextResponse.json(cachedData);
    }

    // Récupérer les nouvelles données
    const apiKey = process.env.NEWS_API_KEY;
    console.log('Environment variables:', {
      NODE_ENV: process.env.NODE_ENV,
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length
    });
    
    if (!apiKey) {
      throw new Error('NEWS_API_KEY is not configured');
    }

    const baseUrl = 'https://newsapi.org/v2/everything';

    const params = new URLSearchParams({
      q: 'france', // Rechercher des articles liés à la France
      apiKey,
      pageSize: '20',
      language: 'fr',
      sortBy: 'publishedAt'
    });

    const apiUrl = `${baseUrl}?${params}`;
    console.log('Fetching from URL:', apiUrl);
    
    const response = await fetch(apiUrl);
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error response:', errorText);
      throw new Error(`News API responded with status: ${response.status}. Error: ${errorText}`);
    }

    const data: NewsAPIResponse = await response.json();
    console.log('API Response data:', {
      status: data.status,
      articleCount: data.articles?.length,
      message: data.message
    });
    
    if (data.status !== 'ok' || !data.articles) {
      throw new Error(`Invalid response from News API: ${data.message || 'Unknown error'}`);
    }

    // Transformer les articles en NewsMarker
    const newsMarkers = data.articles.map((article): NewsMarker => {
      const position = getRandomFrenchPosition();
      // Transformer l'URL de l'image pour utiliser notre proxy
      const imageUrl = article.urlToImage
        ? `/api/image-proxy?url=${encodeURIComponent(article.urlToImage)}`
        : undefined;

      return {
        id: article.url,
        position,
        title: article.title,
        category: 'geopolitique', // Par défaut
        description: article.description || '',
        date: article.publishedAt,
        source: article.source.name,
        imageUrl,
        content: article.content || '',
        readMoreUrl: article.url
      };
    });

    // Sauvegarder dans le cache
    await NewsCache.setData(newsMarkers);

    // Retourner les données filtrées si nécessaire
    if (categories.length > 0) {
      const filteredData = newsMarkers.filter(news => categories.includes(news.category));
      return NextResponse.json(filteredData);
    }

    return NextResponse.json(newsMarkers);

  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
