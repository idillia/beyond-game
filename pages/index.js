import Head from 'next/head'
import Script from 'next/script'
import App from '../src/App';
import React from "react";

export default function index() {
  return (
    <div>
      <Head>
          <title>Beyond runner</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="/styles/style.css" />

      </Head>

      <main>
          <App pageName="Runner" />
      </main>

      <footer></footer>
        <Script src="/scripts/pixi.js" defer />
        <Script type="module" src="/scripts/script.js" />
    </div>

  )
}