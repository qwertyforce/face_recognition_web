import express from 'express'
import next from 'next'
import bodyParser from 'body-parser';
import config from "../config/config"
import multer from 'multer'

const port = parseInt(process.env.NODE_PORT||config.server_port)
const dev = process.env.NODE_ENV !== 'production'
const next_app = next({ dev })
const handle = next_app.getRequestHandler()
//////////////////ROUTE HANDLERS
import sign_in from './routes/sign_in'
import sign_up from './routes/sign_up'
///////////////////////////////////////////////////////////////////
next_app.prepare().then(() => {
  const app = express()
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage,limits:{files:1,fileSize:50000000}})  //50MB
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.disable('x-powered-by');

  app.post('/sign_in',[upload.single('image')],sign_in)
  app.post('/sign_up',[upload.single('image')],sign_up)

  app.all('*', (req, res) => {
    return handle(req, res)
  })
  app.set('trust proxy','127.0.0.1')
  app.listen(port,'localhost', () => {
    console.log(`> Ready on ${port}`)
  })
})