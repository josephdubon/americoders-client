import React from 'react'
import ReactDOM from 'react-dom'
import App from 'next/app'
import Router from 'next/router'
import Head from 'next/head'

import PageChange from '../components/PageChange/PageChange.js'

import '/styles/scss/americoders.scss?v=1.2.0'
import { PageHead } from '../components/PageHead/PageHead'
import { Provider } from '../context'

// analytics tracking
import PlausibleProvider from 'next-plausible'

// notifications
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Script from 'next/script'

Router.events.on('routeChangeStart', (url) => {
  // console.log(`Loading: ${url}`)
  document.body.classList.add('body-page-transition')
  ReactDOM.render(
    <PageChange path={url}/>,
    document.getElementById('page-transition'),
  )
})
Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'))
  document.body.classList.remove('body-page-transition')
})
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'))
  document.body.classList.remove('body-page-transition')
})

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <>

        {/* head scripts */}
        <Head>
          <Script
            type="text/javascript"
            src={'https://app.termly.io/embed.min.js'}
            data-auto-block="on"
            data-website-uuid="a9d82342-1f11-4be9-ab0a-a2bcfaf09c65"
          ></Script>
        </Head>

        {/* plausible analytics */}
        <PlausibleProvider
          domain="americoders.org"
          trackOutboundLinks={true}
          trackFileDownloads={true}
        >
          {/* wrap app in provider for access to state */}
          <Provider>
            {/* page head section*/}
            <PageHead title={'Americoders'}/>
            <Component {...pageProps} />
          </Provider>
        </PlausibleProvider>
        {/* notifications */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    )
  }
}