export interface CurrenciesEntity {
  code: string;
  title: string;
  slug: string;
  url: string;
}

export interface Votes {
  negative: number;
  positive: number;
  important: number;
  liked: number;
  disliked: number;
  lol: number;
  toxic: number;
  saved: number;
  comments: number;
}

export interface Source {
  title: string;
  region: string;
  domain: string;
  path?: null;
}

export interface INews {
  kind: string;
  domain: string;
  source: Source;
  title: string;
  published_at: string;
  slug: string;
  currencies?: CurrenciesEntity[] | null;
  id: number;
  url: string;
  created_at: string;
  votes: Votes;
}
