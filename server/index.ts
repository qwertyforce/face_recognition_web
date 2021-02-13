import express from 'express'
import next from 'next'
import config from "../config/config"
const port = parseInt(process.env.NODE_PORT||config.server_port)
const dev = process.env.NODE_ENV !== 'production'
const next_app = next({ dev })
const handle = next_app.getRequestHandler()
next_app.prepare().then(() => {
  const app = express()
  app.all('*', (req, res) => {
    return handle(req, res)
  })
  app.set('trust proxy','127.0.0.1')
  app.listen(port,'localhost', () => {
    console.log(`> Ready on ${port}`)
  })
})