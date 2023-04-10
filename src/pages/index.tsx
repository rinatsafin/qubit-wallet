// import styles from '@/shared/styles/Home.module.css';
// import Head from 'next/head';
// import Image from 'next/image';
import { CustomHead, Footer, Navbar, Services } from '@/feauters';
import { type FC } from 'react';
import { HomePage } from './HomePage';

// const inter = Inter({ subsets: ['latin'] });

// function Home() {
//   const account = useAccount();

//   return (
//     <>
//       <Head>
//         <title>Qubit wallet dApp</title>
//         <meta
//           name='description'
//           content='Swap, earn, and use BNB, ETH, CHR on the leading decentralized crypto trading protocol.'
//         />
//         <meta name='viewport' content='width=device-width, initial-scale=1' />
//         <link rel='icon' href='/favicon.ico' />
//       </Head>
//       <main className={styles.main}>
//         {account.isConnected ? <h1 className='blue'>Loading</h1> : <h2 className='red'>Idle</h2>}
//         <code>
//           <pre>{JSON.stringify(account, null, 2)}</pre>
//         </code>
//         <div className={styles.description}>
//           <p>
//             Get started by editing&nbsp;
//             <code className={styles.code}>src/pages/index.tsx</code>
//           </p>
//           <div>
//             <a
//               href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
//               target='_blank'
//               rel='noopener noreferrer'
//             >
//               By{' '}
//               <Image
//                 src='/vercel.svg'
//                 alt='Vercel Logo'
//                 className={styles.vercelLogo}
//                 width={100}
//                 height={24}
//                 priority
//               />
//             </a>
//           </div>
//         </div>

//         <div className={styles.center}>
//           <Image
//             className={styles.logo}
//             src='/next.svg'
//             alt='Next.js Logo'
//             width={180}
//             height={37}
//             priority
//           />
//           <div className={styles.thirteen}>
//             <Image src='/thirteen.svg' alt='13' width={40} height={31} priority />
//           </div>
//         </div>

//         <div className={styles.grid}>
//           <a
//             href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
//             className={styles.card}
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             <h2 className={inter.className}>
//               Docs <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Find in-depth information about Next.js features and&nbsp;API.
//             </p>
//           </a>

//           <a
//             href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
//             className={styles.card}
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             <h2 className={inter.className}>
//               Learn <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Learn about Next.js in an interactive course with&nbsp;quizzes!
//             </p>
//           </a>

//           <a
//             href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
//             className={styles.card}
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             <h2 className={inter.className}>
//               Templates <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Discover and deploy boilerplate example Next.js&nbsp;projects.
//             </p>
//           </a>

//           <a
//             href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
//             className={styles.card}
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             <h2 className={inter.className}>
//               Deploy <span>-&gt;</span>
//             </h2>
//             <p className={inter.className}>
//               Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.
//             </p>
//           </a>
//         </div>
//       </main>
//     </>
//   );
// }

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
