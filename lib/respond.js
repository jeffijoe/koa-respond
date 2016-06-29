'use strict';
const isString = require('is-string');

// No Content is special.
const NO_CONTENT = 204;

/**
 * Sets the given status on the context and
 * sets the response body.
 *
 * @param  {KoaContext} ctx
 *
 * @return {KoaContext} The input context.
 */
module.exports = function respond(ctx, status, payload) {
  ctx.status = status;
  if (status === NO_CONTENT) {
    ctx.body = null;
    return ctx;
  }

  if (payload === undefined) {
    return ctx;
  }

  if (isString(payload)) {
    payload = {
      message: payload
    };
  }

  ctx.body = payload;
  return ctx;
};