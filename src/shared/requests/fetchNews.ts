import { type NewsApiResponse } from '@/shared';

// NOTE: Unfortunately Next.js 13 in beta version has bugs and we can not import functions from outside.
export async function fetchNews({
  page,
  revalidate,
}: {
  page?: string;
  revalidate?: number | undefined;
  public?: boolean;
  kind?: 'news' | 'all' | 'media';
  filter?: 'rising' | 'hot' | 'bullish' | 'bearish' | 'important' | 'saved' | 'lol';
  // TODO: Only for the PRO account, which allows you to include additional metadata about the posts.
  // Extra metadata: https://cryptopanic.com/developers/api/
  // metadata?: boolean;
} = {}): Promise<NewsApiResponse> {
  try {
    const params = {
      auth_token: process.env.CRYPTOPANIC_API_KEY ?? '',
      currencies: 'BTC,ETH,XRP',
      public: 'true',
      kind: 'news',
    };
    const result = await fetch(
      `${
        process.env.CRYPTOPANIC_HOST || 'https://cryptopanic.com/api/v1/posts/'
      }?${new URLSearchParams(params)}${page ? `&page=${page}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate,
        },
      },
    );
    // kind: string;
    // domain: string;
    // source: Source;
    // title: string;
    // published_at: string;
    // slug: string;
    // currencies?: CurrenciesEntity[] | null;
    // id: number;
    // url: string;
    // created_at: string;
    // votes: Votes;
    const {
      results = [
        {
          id: 0,
          title: 'Please reload the page',
          url: '',
          kind: 'Something went wrong',
          domain: 'News API is not available',
          source: {
            title: '',
            region: '',
            domain: '',
          },
          published_at: new Date().toUTCString(),
          slug: '',
          created_at: new Date().toUTCString(),
          votes: {
            negative: 0,
            positive: 0,
            important: 0,
            liked: 0,
            disliked: 0,
            lol: 0,
            toxic: 0,
            saved: 0,
            comments: 0,
          },
        },
      ],
      next,
      count = 1,
    }: NewsApiResponse = await result.json();
    return {
      results,
      next: next?.split('page=')[1] ?? null,
      count,
    };
  } catch (error) {
    console.error(error);
    return {
      next: null,
      results: [],
      count: 0,
    };
  }
}
