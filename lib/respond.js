'use strict'
const isString = require('is-string')

// No Content is special.
const NO_CONTENT = 204

/**
 * Makes a respond function.
 */
module.exports = function makeRespond(opts) {
  opts = Object.assign(
    {
      autoMessage: true
    },
    opts
  )

  /**
   * Sets the given status on the context and
   * sets the response body.
   *
   * @param  {KoaContext} ctx
   *
   * @return {KoaContext} The input context.
   */
  return function respond(ctx, status, payload) {
    ctx.status = status
    if (status === NO_CONTENT) {
      ctx.body = null
      return ctx
    }

    if (payload === undefined) {
      return ctx
    }

    if (opts.autoMessage && isString(payload)) {
      payload = {
        message: payload
      }
    }

    ctx.body = payload
    return ctx
  }
}
