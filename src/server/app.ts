import express, { RequestHandler } from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import expressStaticGzip from 'express-static-gzip'
import path from 'path'
import devWebpackConfig from '../../webpack/dev'
import api from './api'

/* eslint-disable no-console */

const onServerListenStart = (port: number) => {
  console.log(`Started. Listening on port ${port}.`)
}

const getPort = () => {
  const envDefinedPort = process.env.SERVER_PORT != null ? parseInt(process.env.SERVER_PORT) : null
  if (envDefinedPort == null)
    console.warn('Process environment variable SERVER_PORT not defined. Using default 8080.')
  return envDefinedPort ?? 8080
}

const getRequestDelayMs = () => {
  const requestDelayMsRaw = process.env.REQUEST_DELAY_MS != null && process.env.REQUEST_DELAY_MS.length > 0
    ? parseInt(process.env.REQUEST_DELAY_MS)
    : null
  return requestDelayMsRaw != null && !Number.isNaN(requestDelayMsRaw) ? Math.max(requestDelayMsRaw, 0) : null
}

const isProduction = process.env.NODE_ENV === 'production'
const requestDelayMs = getRequestDelayMs()

const delayMiddleware: RequestHandler = (req, res, next) => {
  if (requestDelayMs != null) {
    setTimeout(next, requestDelayMs)
    return;
  }
  next()
}

const app = express()

if (!isProduction) {
  const webpackCompiler = webpack(devWebpackConfig)
  app
    // -- Webpack dev and hot middleware to enable webpack to serve client files with hot reloading
    .use(webpackDevMiddleware(webpackCompiler))
    .use(webpackHotMiddleware(webpackCompiler))
    // -- Optional api request throttle for simulating slow requests (often to show loading animations/pages for longer)
    .use('/api', delayMiddleware)
}

app
  // -- Handle api requests
  .use('/api', api)
  // -- Send 404 for api requests that don't match an api route
  .use('/api', (req, res) => res.sendStatus(404))

if (isProduction) {
  app.use('/', expressStaticGzip(path.resolve('./build/client'), { }))
  // Because we are an SPA, any get requests that don't match '/' or the api should route back to '/'
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./build/client/index.html'))
  })
}
else {
  // Because we are an SPA, any get requests that don't match '/' or the api should route back to '/'
  app.get('*', (req, res) => {
    req.url = '/'
    // @ts-ignore
    app.handle(req, res)
  })
}

const port = getPort()
app.listen(port, '0.0.0.0', () => onServerListenStart(port))
