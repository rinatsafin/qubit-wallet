import { INews } from '@/shared/types';
import axios from 'axios';

export interface NewsApiResponse {
  results: INews[];
  next: string | null;
}

export async function fetchNews(page?: string): Promise<{
  nextNewsPage: string | null;
  news: INews[];
}> {
  try {
    const params = {
      auth_token: process.env.CRYPTOPANIC_API_KEY,
      currencies: 'BTC,ETH,XRP',
      public: true,
      kind: 'news',
      page,
      responseType: 'json',
    };
    const response = await axios.get<NewsApiResponse>('https://cryptopanic.com/api/v1/posts/', {
      params,
    });
    return {
      nextNewsPage: response.data?.next?.split('page=')[1] ?? null,
      news: response.data.results ?? [],
    };
  } catch (error) {
    console.error(error);
    return {
      nextNewsPage: null,
      news: [],
    };
  }
}
