import NextHead from 'next/head';

const CustomHead = () => {
  return (
    <NextHead>
      <title>Qubit wallet dApp</title>
      <meta
        name='description'
        content='Swap, earn, and use BNB, ETH, CHR on the leading decentralized crypto trading protocol.'
      />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </NextHead>
  );
};

export default CustomHead;
