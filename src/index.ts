import "reflect-metadata"
import Koa from 'koa';
import { bookRouter } from './routes/Books'
import db from './db'

const app = new Koa();
var bodyParser = require('koa-bodyparser')
app.use(bodyParser());

const PORT = 3000;

const main = async () => {
  await db.initialize();
  console.log(`db - online`);
  console.log(`seeds - online`);

  app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

  app.use(bookRouter.routes());

  app.listen(PORT);
  console.log(`app - online, port ${PORT}`);
};

main().then(() => console.log('all systems nominal')).catch(console.error)
