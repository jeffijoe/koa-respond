# koa-respond

[![npm version](https://badge.fury.io/js/koa-respond.svg)](https://badge.fury.io/js/koa-respond)
[![Dependency Status](https://david-dm.org/jeffijoe/koa-respond.svg)](https://david-dm.org/jeffijoe/koa-respond)
[![devDependency Status](https://david-dm.org/jeffijoe/koa-respond/dev-status.svg)](https://david-dm.org/jeffijoe/koa-respond#info=devDependencies)
[![Build Status](https://travis-ci.org/jeffijoe/koa-respond.svg?branch=master)](https://travis-ci.org/jeffijoe/koa-respond)
[![Coverage Status](https://coveralls.io/repos/github/jeffijoe/koa-respond/badge.svg?branch=master)](https://coveralls.io/github/jeffijoe/koa-respond?branch=master)
[![Code Climate](https://codeclimate.com/github/jeffijoe/koa-respond/badges/gpa.svg)](https://codeclimate.com/github/jeffijoe/koa-respond)

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

  // You can also send errors.
  // Becomes `{ message: 'not good enough', stack: '<the stack trace>' }`
  ctx.badRequest(new Error('not good enough'));

  // Or if you prefer to do it yourself..
  // Both of these send a HTTP 201 with a body
  // of `{ message: 'new beginnings!' }`
  ctx.respond(201, 'new beginnings!');
  ctx.respond(201, { message: 'new beginnings!' });
});
```

## Methods

All methods call the `respond` method with the corresponding status code as well as the body. That means they support the same overloads as `respond`:

* With a string; wraps it in an object with a `message` property. That means the following 2 calls do the same thing:

  ```js
  ctx.respond(400, 'lol no');
  ctx.respond(400, { message: 'lol no' });
  ```

* With an object; sends the object as JSON.

  ```js
  ctx.respond(200, { id: 123, name: 'new entity' });
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
      ctx.respond(200, message + ', fo-shizzle');
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
