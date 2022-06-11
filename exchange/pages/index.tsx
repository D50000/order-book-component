import { FunctionComponent } from "react";
import Head from "next/head";

import OrderBook from "../components/OrderBook";
import { Container } from "./styles/styles";

const Home: FunctionComponent = (): JSX.Element => {
  return (
    <Container>
      <Head>
        <title>Nogle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <OrderBook />
      </main>

      <footer>
        <a
          href="https://github.com/D50000"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by D5000
        </a>
      </footer>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Container>
  );
};

export default Home;
