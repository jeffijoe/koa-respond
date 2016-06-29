'use strict';
const isString = require('is-string');

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