import { type NewsApiResponse } from '@/shared';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamicParams = true;
// TODO: Move to process.env
const REVALIDATE_CACHE_NEWS_TIME = 600;

// NOTE: This is a workaround for the Next.js bug with dynamic routes.
// Unfortunately Next.js 13 in beta version has bugs and we can not import functions from outside.
async function fetchNews({
  page,
  revalidate,
  isPublic = true,
  currencies = 'BTC,ETH,XRP',
  kind = 'news',
}: {
  page?: string;
  currencies?: string;
  revalidate?: number | undefined;
  isPublic?: true | undefined;
  kind?: 'news' | 'all' | 'media';
  filter?: 'rising' | 'hot' | 'bullish' | 'bearish' | 'important' | 'saved' | 'lol';
  // TODO: Only for the PRO account, which allows you to include additional metadata about the posts.
  // Extra metadata: https://cryptopanic.com/developers/api/
  // metadata?: boolean;
} = {}): Promise<NewsApiResponse> {
  try {
    const params = {
      auth_token: process.env.CRYPTOPANIC_API_KEY ?? '',
      currencies,
      public: isPublic && 'true',
      kind,
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
      next = '1',
      count = 1,
    }: NewsApiResponse = await result.json();
    return {
      results,
      next: next?.split('page=')[1] ?? null,
      count,
    };
  } catch (error) {
    console.error('fetchNews->error', error);
    return {
      next: '1',
      results: [],
      count: 1,
    };
  }
}

const News = async () => {
  const { results, count, next } = await fetchNews({
    revalidate: REVALIDATE_CACHE_NEWS_TIME,
  });
  if (!results.length) return notFound();
  const maxPages = count / results.length - 1;
  return (
    <div className='flex max-w-screen-mf flex-1 flex-col items-center justify-between px-4 py-12 text-white md:p-10'>
      <h1 className='text-gradient mb-4 text-4xl font-bold sm:text-6xl'>Crypto News</h1>
      <div className='text-lg text-gray-500'>Pages count: {maxPages}</div>
      <div className='mx-auto mt-8 flex w-full flex-row justify-end'>
        <div>
          <p className='mb-2 text-base font-medium text-gray-500'>Next Page</p>
          <Link
            href={`/news/${next}`}
            className='flex w-full items-center justify-center rounded-lg bg-cyan-600 p-3 text-white hover:bg-cyan-700'
          >
            Go to next page {next}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='ml-1 h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 16.707a1 1 0 010-1.414L11.586 11H4a1 1 0 110-2h7.586l-4.293-4.293a1 1 0 011.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4 px-5 md:grid-cols-2 mf:px-0 lg:grid-cols-3'>
        {results.map((item) => (
          <div
            className='flex flex-col justify-between overflow-hidden rounded-lg bg-white p-4 shadow'
            key={item.id}
          >
            <div>
              <p className='text-lg font-medium text-gray-900'>{item.title}</p>
              <p className='text-sm text-gray-500'>{new Date(item.created_at).toLocaleString()}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                News by {item.source.title} - region {item.source.region}
              </p>
            </div>
            <div className='mt-3'>
              <a
                href={item.url}
                target='_blank'
                rel='noopener'
                className='text-base font-medium text-blue-600 hover:text-blue-500'
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
