import express from 'express'
import { createServer as createViteServer } from 'vite'
import { apiIndexRouter } from './api/index-api';
import { resolve } from 'path'
import { ssrHander } from './ssr-utils';
import morgan from 'morgan';


export async function createApp(): Promise<ReturnType<typeof express>> {
  const app = express();
  app.use(morgan('dev'))

  const vite = await createViteServer({
    root: resolve(__dirname, '../'),
    server: {
      middlewareMode: true
    },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.use('/api', apiIndexRouter)

  app.get('*', (req, res) => {
    ssrHander(req, res, vite);
  });

  return app
}

(async () => {
  const app = await createApp();
  app.listen(5000, '0.0.0.0', () => {
    console.log('listening in port 50000')
  });

})().catch(console.error)