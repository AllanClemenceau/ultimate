import fs from 'fs';
import path from 'path';
import { NewsMarker } from '@/types/news';

interface CacheData {
  lastUpdate: string;
  data: NewsMarker[];
}

const CACHE_FILE = path.join(process.cwd(), 'cache', 'news-cache.json');
const UPDATE_INTERVAL = 8 * 60 * 60 * 1000; // 8 heures en millisecondes

export class NewsCache {
  private static ensureCacheDirectory() {
    const cacheDir = path.join(process.cwd(), 'cache');
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
  }

  private static async readCache(): Promise<CacheData | null> {
    try {
      NewsCache.ensureCacheDirectory();
      if (!fs.existsSync(CACHE_FILE)) {
        return null;
      }
      const data = await fs.promises.readFile(CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  }

  private static async writeCache(data: NewsMarker[]): Promise<void> {
    try {
      NewsCache.ensureCacheDirectory();
      const cacheData: CacheData = {
        lastUpdate: new Date().toISOString(),
        data,
      };
      await fs.promises.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    } catch (error) {
      console.error('Error writing cache:', error);
    }
  }

  static async getData(): Promise<NewsMarker[] | null> {
    const cache = await NewsCache.readCache();
    if (!cache) return null;
    
    const lastUpdate = new Date(cache.lastUpdate).getTime();
    const now = new Date().getTime();
    
    if (now - lastUpdate > UPDATE_INTERVAL) {
      return null; // Cache expiré
    }
    
    return cache.data;
  }

  static async setData(data: NewsMarker[]): Promise<void> {
    await NewsCache.writeCache(data);
  }

  static async isExpired(): Promise<boolean> {
    const cache = await NewsCache.readCache();
    if (!cache) return true;
    
    const lastUpdate = new Date(cache.lastUpdate).getTime();
    const now = new Date().getTime();
    
    return now - lastUpdate > UPDATE_INTERVAL;
  }
}
