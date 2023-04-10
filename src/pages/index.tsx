import { CustomHead, Footer, Navbar, Services } from '@/feauters';
import { type FC } from 'react';
import { HomePage } from './HomePage';

const Pages: FC = () => (
  <>
    <HomePage />
    <Services />
  </>
);

const App = () => {
  return (
    <>
      <CustomHead />
      <div className='app gradient-bg-home relative min-w-[23.4375rem]'>
        <Navbar />
        <Pages />
        <Footer />
      </div>
    </>
  );
};

const IndexPage = () => {
  return <App />;
};
export default IndexPage;
