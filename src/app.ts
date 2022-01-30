import render from './lib/render';
import logger from 'koa-logger';
import Router  from '@koa/router';
import koaBody from 'koa-body';


import Koa from 'koa';
const app = module.exports = new Koa();
const router = new Router();

// "database"

const posts : [] = [];

// middleware

app.use(logger());

app.use(render);

app.use(koaBody());

// route definitions

router.get('/', list);
  // .get('/post/new', add)
  // .get('/post/:id', show)
  // .post('/post', create);

app.use(router.routes());

/**
 * Post listing.
 */

async function list(ctx : any) {
  await ctx.render('index', { posts: posts });
}

/**
 * Show creation form.
 */

// async function add(ctx) {
//   await ctx.render('new');
// }

/**
 * Show post :id.
 */

// async function show(ctx : any) {
//   const id = ctx.params.id;
//   const post = posts[id];
//   if (!post) ctx.throw(404, 'invalid post id');
//   await ctx.render('show', { post: post });
// }

/**
 * Create a post.
 */

// async function create(ctx: ayn) {
//   const post: = ctx.request.body;
//   const id = posts.push(post) - 1;
//   post.created_at = new Date();
//   post.id = id;
//   ctx.redirect('/');
// }

// listen

app.listen(3000, ()  => {
  console.log('listening on port 3000');
});