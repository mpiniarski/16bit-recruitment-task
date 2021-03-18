import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import Head from "next/head";

const MyApp = ({Component, pageProps}: AppProps) => <>
  <Head>
    <title>Simple Roulette - 16bit Recruitment task </title>
    <link rel="icon" href="/favicon.ico"/>
  </Head>
  <Component {...pageProps} />
</>

export default MyApp