import Head from 'next/head'

export const PageHead = ({ title }) => {
  return (<>
    <Head>
      <title key="title">{title} - Americoders</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
  </>)
}