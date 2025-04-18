/**
 * Vérifie si une URL d'image est valide et retourne une URL de repli si nécessaire
 */
export function getValidImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return '/images/placeholder-news.jpg'; // Image par défaut
  }

  try {
    const url = new URL(imageUrl);
    // Liste des extensions d'images courantes
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    
    // Vérifie si l'URL se termine par une extension d'image valide
    if (validExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext))) {
      return imageUrl;
    }

    // Pour les URLs sans extension mais avec un protocole HTTPS
    if (url.protocol === 'https:') {
      return imageUrl;
    }

    return '/images/placeholder-news.jpg';
  } catch (error) {
    // Si l'URL n'est pas valide, retourne l'image par défaut
    return '/images/placeholder-news.jpg';
  }
}
