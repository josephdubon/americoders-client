const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // if in dev mode, apply server
    if (dev) {
      // prefix routes with '/api'
      server.use(
        '/api',
        createProxyMiddleware({
          target: process.env.LOCAL_BACKEND_HOST,
          changeOrigin: true,
        }),
      )
    }

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on ', process.env.LOCAL_BACKEND_HOST)
    })
  })
  .catch((err) => {
    console.log('Error', err)
  })
