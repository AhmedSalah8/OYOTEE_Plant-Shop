import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Discover a wide variety of indoor and outdoor plants at OYOTEE. From Monstera to rare seeds, find everything you need for your green space."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          name="keywords"
          content="plants, online plant shop, gardening, indoor plants, seeds, planters, OYOTEE"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="OYOTEE | Shop Beautiful Plants Online"
        />
        <meta
          property="og:description"
          content="Bring nature to your home with OYOTEE. Quality plants delivered to your doorstep."
        />
        <meta property="og:image" content="/og-image.jpg" />{" "}
        <link rel="icon" href="/logo.svg" />
        <meta name="theme-color" content="#2f7d4f" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
