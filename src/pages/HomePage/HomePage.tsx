import { Welcome } from '@/feauters';
import { type FC } from 'react';

// type HomePageProps = {};
// bg-gradient-to-r from-violet-500 to-fuchsia-500

const HomePage: FC = () => {
  return (
    <main>
      <div className='main relative min-h-screen text-white bg-blend-darken'>
        <Welcome />
      </div>
    </main>
  );
};

export default HomePage;
