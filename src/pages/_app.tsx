// pages/_app.tsx
import type { AppProps } from "next/app";
import Navbar from "@/components/layout/Navbar";
import styled from "styled-components";
import Head from "next/head";
import "@/styles/globals.css";
import { CartProvider } from "../context/CartContext";
const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.main`
  flex: 1;
  /* background: #f7f8fa; */
`;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Head>
        <title>OYOTEE | Your Premium Online Plant Shop</title>
      </Head>
      <AppWrapper>
        <Navbar />
        <PageContent>
          <Component {...pageProps} />
        </PageContent>
      </AppWrapper>
    </CartProvider>
  );
}
