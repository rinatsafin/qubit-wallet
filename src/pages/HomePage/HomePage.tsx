import { CustomHead, Footer, Navbar, Transactions, Welcome } from '@/feauters';
import { Services } from '@/feauters/Services';
import { type FC } from 'react';

// type HomePageProps = {};
// bg-gradient-to-r from-violet-500 to-fuchsia-500

const HomePage: FC = () => {
  return (
    <>
      <CustomHead />
      <main>
        <div className='main relative min-h-screen bg-black text-white bg-blend-darken'>
          <div className='gradient-bg-welcome'>
            <Navbar />
            <Welcome />
          </div>
          <Services />
          <Transactions />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default HomePage;
