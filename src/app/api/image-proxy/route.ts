import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const CACHE_DIR = path.join(process.cwd(), 'cache', 'images');

// Assure que le dossier de cache existe
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return new NextResponse('URL parameter is required', { status: 400 });
    }

    // Créer un hash du nom de fichier pour éviter les problèmes de caractères spéciaux
    const hash = crypto.createHash('md5').update(imageUrl).digest('hex');
    const cachedPath = path.join(CACHE_DIR, `${hash}.bin`);
    const metadataPath = path.join(CACHE_DIR, `${hash}.json`);

    // Vérifier si l'image est en cache
    if (fs.existsSync(cachedPath) && fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      const imageBuffer = fs.readFileSync(cachedPath);
      
      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': metadata.contentType,
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    }

    // Télécharger l'image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await response.arrayBuffer());

    // Sauvegarder l'image et ses métadonnées dans le cache
    fs.writeFileSync(cachedPath, buffer);
    fs.writeFileSync(metadataPath, JSON.stringify({
      originalUrl: imageUrl,
      contentType,
      cached: new Date().toISOString(),
    }));

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Failed to process image', { status: 500 });
  }
}
