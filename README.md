# koa-respond

[![npm](https://img.shields.io/npm/v/koa-respond.svg)](https://www.npmjs.com/package/koa-respond)
[![dependency Status](https://img.shields.io/david/jeffijoe/koa-respond.svg)](https://david-dm.org/jeffijoe/koa-respond)
[![devDependency Status](https://img.shields.io/david/dev/jeffijoe/koa-respond.svg)](https://david-dm.org/jeffijoe/koa-respond)
[![Build Status](https://img.shields.io/travis/jeffijoe/koa-respond.svg)](https://travis-ci.org/jeffijoe/koa-respond)
[![Coveralls](https://img.shields.io/coveralls/jeffijoe/koa-respond.svg)](https://coveralls.io/github/jeffijoe/koa-respond)
[![Code Climate](https://img.shields.io/codeclimate/github/jeffijoe/koa-respond.svg)](https://codeclimate.com/github/jeffijoe/koa-respond)
[![npm](https://img.shields.io/npm/dt/koa-respond.svg)](https://www.npmjs.com/package/koa-respond)
[![license](https://img.shields.io/npm/l/koa-respond.svg)](https://github.com/jeffijoe/koa-respond/blob/master/LICENSE.md)
[![node](https://img.shields.io/node/v/koa-respond.svg)](https://www.npmjs.com/package/koa-respond)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
<a href="https://communityinviter.com/apps/koa-js/koajs" rel="KoaJs Slack Community">![KoaJs Slack](https://img.shields.io/badge/Koa.Js-Slack%20Channel-Slack.svg?longCache=true&style=for-the-badge)</a>


Middleware for Koa that adds useful methods to the Koa context.

## Installation

```bash
npm install --save koa-respond
```

## Usage

```js
// Install it
const respond = require('koa-respond');

// For Koa v2 - if you are looking for v1, scroll to the bottom.
app.use(respond());

// Use it
app.use((ctx) => {
  // Sets status to 200 and the body to `{ id: 123, name: 'Dat Boi' }`
  ctx.ok({ id: 123, name: 'Dat Boi' });

  // Both of these set status to 404 and
  // the body to `{ message: 'Not found, boii' }`
  ctx.notFound('Not found, boii');
  ctx.notFound({ message: 'Not found, boii' });

  // And everyone's favorite..
  ctx.badRequest({ error: 'missing input' });

  // Or if you prefer to do it yourself..
  // Both of these send a HTTP 201 with a body
  // of `{ message: 'new beginnings!' }`
  ctx.send(201, 'new beginnings!');
  ctx.send(201, { message: 'new beginnings!' });
});
```

## Methods

All methods call the `send` method with the corresponding status code as well as the body. That means they support the same overloads as `send`:

* With a string; wraps it in an object with a `message` property. That means the following 2 calls do the same thing:

  ```js
  ctx.send(400, 'lol no');
  ctx.send(400, { message: 'lol no' });
  ```

* With an object; sends the object as JSON.

  ```js
  ctx.send(200, { id: 123, name: 'new entity' });
  ```

If you wish to disable the automatic wrapping of strings globally, you can instantiate `koa-respond` with `autoMessage: false`.

```js
app.use(respond({
  autoMessage: false
}))
```

All functions return the Koa context itself (chainable)

```js
ctx.ok().set({ 'X-Some-Header': 'awesome' })
```

All functions are also bound to the context. This means you can pass the function as a reference without having to bind it first.

```js
app.use((ctx) => somePromiseCall().then(ctx.ok))
```

### Available methods

* `ok` - `HTTP 200`
* `created` - `HTTP 201`
* `noContent` - `HTTP 204` - **always sends an empty response!**
* `badRequest` - `HTTP 400`
* `unauthorized` - `HTTP 401`
* `forbidden` - `HTTP 403`
* `notFound` - `HTTP 404`
* `internalServerError` - `HTTP 500`

## Does this work for Koa 1?

**Not out of the box**, because it's time you move on to v2.

To use `koa-respond` in Koa v1, you need to patch the context yourself. This is what the v2 middleware does.

```js
const respond = require('koa-respond');

// Middleware to install koa-respond.
app.use(function *(next) {
  respond().patch(this);
  yield next;
});

// Now the methods are available.
app.use(function *() {
  this.ok({ id: 123, name: 'Bob' });
});
```

## Adding additional methods

If you feel like some methods are missing, you can add them yourself, like so:

```js
app.use(respond({
  statusMethods: {
    imATeapot: 418,
    enhanceYourCalm: 420
  }
}));

app.use((ctx) => {
  ctx.imATeapot('Hello, a Teapot I am.');
  ctx.enhanceYourCalm({ todo: 'blaze it' });
});
```

## Even more custom methods

If you just want to add shortcuts without adding an additional middleware, you can do that, too.

```js
app.use(respond({
  methods: {
    shizzle: (ctx, message) => {
      ctx.send(200, message + ', fo-shizzle');
    }
  }
}));

app.use((ctx) => {
  // HTTP 200 { message: 'Koa is the best, fo-shizzle' }
  ctx.shizzle('Koa is the best');
});
```

# Contributing

## `npm run` scripts

* `npm run test`: Runs tests once
* `npm run test-watch`: Runs tests in watch-mode
* `npm run lint`: Lints the code once
* `npm run lint-watch`: Lints the code in watch-mode
* `npm run cover`: Runs code coverage using `istanbul`
* `npm run coveralls`: Used by coveralls

# Author

Jeff Hansen - [@Jeffijoe](https://twitter.com/Jeffijoe)
