import express from 'express'
import { createServer as createViteServer } from 'vite'
import { apiIndexRouter } from './api/index-api';
import { resolve } from 'path'


export async function createApp() {
  const app = express();

  const vite = await createViteServer({
    root: resolve(__dirname, '../'),
    server: {
      middlewareMode: true
    },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.use('/api', apiIndexRouter)

  // app.use('*', async (req, res) => {
  //   // 服务 index.html - 下面我们来处理这个问题
  // });

  return app
}

(async () => {
  const app = await createApp();
  app.listen(50000, '0.0.0.0', () => {
    console.log('listening in port 50000')
  })

})().catch(console.error)