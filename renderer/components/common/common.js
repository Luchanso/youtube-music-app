import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Titillium Web', sans-serif;
    color: #ff9f1c;
    background: #262626;
  }
`;

export default () => (
  <>
    <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Titillium+Web:400,600"
      />
    </Head>
    <GlobalStyle />
  </>
);
