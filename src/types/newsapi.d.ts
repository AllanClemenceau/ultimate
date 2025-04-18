declare module 'newsapi' {
  interface Article {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
    category?: string;
  }

  interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: Article[];
  }

  interface Options {
    q?: string;
    sources?: string;
    domains?: string;
    language?: string;
    country?: string;
    category?: string;
    pageSize?: number;
    page?: number;
  }

  class NewsAPI {
    constructor(apiKey: string);
    v2: {
      topHeadlines(options: Options): Promise<NewsAPIResponse>;
      everything(options: Options): Promise<NewsAPIResponse>;
    };
  }

  export = NewsAPI;
}
