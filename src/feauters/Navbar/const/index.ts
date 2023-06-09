import { uid } from 'uid';

const navList = [
  {
    id: uid(),
    title: 'Home',
    path: '/',
  },
  {
    id: uid(),
    title: 'News',
    path: '/news',
  },
  {
    id: uid(),
    title: 'Market*',
    path: '/market',
  },
  {
    id: uid(),
    title: 'Exchange*',
    path: '/exchange',
  },
  {
    id: uid(),
    title: 'Tutorials*',
    path: '/tutorials',
  },
  {
    id: uid(),
    title: 'Wallets*',
    path: '/wallets',
  },
];

export { navList };
