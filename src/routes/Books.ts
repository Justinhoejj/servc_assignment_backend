import Router from '@koa/router';
import { Book, PostBook } from '../models/Books'
import db from '../db'
const bookRouter = new Router();
const BOOK_ENDPOINT = "/books"
const ID = "/:id"

bookRouter
  .post(BOOK_ENDPOINT, async (ctx) => {
    const data = <PostBook>ctx.request.body
    const book = new Book();
    book.name = data.name
    book.isbn = data.isbn
    book.author = data.author
    book.releaseDate = data.releaseDate
    await db.manager.save(book);

  })
  .get(BOOK_ENDPOINT, async (ctx) => {
    const repository = db.getRepository(Book)
    const books = await repository.find()
    ctx.body = books;
  })
  .get(BOOK_ENDPOINT + ID, async (ctx) => {
    const repository = db.getRepository(Book)
    const book = await repository.findOneBy({ uuid: Number(ctx.params.id) })
    ctx.body = book
  })
  .put(BOOK_ENDPOINT + ID, async (ctx) => {
    const data = <PostBook>ctx.request.body
    const book = <Book>await db.getRepository(Book).findOneBy({ uuid: Number(ctx.params.id) })
    if (book == null) {
      ctx.status = 404
      return
    } else {
      db.getRepository(Book).merge(book, data)
      await db.getRepository(Book).save(book)
      ctx.status = 204
    }
  })
  .delete(BOOK_ENDPOINT + ID, async (ctx) => {
    const repository = db.getRepository(Book)
    repository.delete(ctx.params.id)
    ctx.status = 202
  });

export { bookRouter }