import useSWR from 'swr';
import { NewsMarker, NewsCategory } from '@/types/news';

const fetcher = async (url: string) => {
  console.log('Fetching news from:', url);
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('Une erreur est survenue lors de la récupération des actualités');
    const errorData = await res.json().catch(() => ({}));
    (error as any).info = errorData;
    (error as any).status = res.status;
    throw error;
  }
  const data = await res.json();
  console.log('API Response:', data);
  return data;
};

export function useNews(categories: NewsCategory[] = []) {
  const { data, error, isLoading, mutate } = useSWR<NewsMarker[]>(
    `/api/news${categories.length ? `?categories=${categories.join(',')}` : ''}`,
    fetcher,
    {
      refreshInterval: 5 * 60 * 1000, // Rafraîchir toutes les 5 minutes
      revalidateOnFocus: true,
      dedupingInterval: 5000, // Dédupliquer les requêtes dans un intervalle de 5 secondes
      errorRetryCount: 3, // Réessayer 3 fois en cas d'erreur
    }
  );

  const errorMessage = error
    ? (error as any).info?.error || error.message || 'Une erreur est survenue'
    : null;

  return {
    news: data || [],
    isLoading,
    isError: errorMessage,
    refresh: () => mutate(),
  };
}
