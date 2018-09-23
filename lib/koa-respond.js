'use strict'
const makeRespond = require('./respond')

/**
 * Maps method names to status codes.
 * These are just the most common ones.
 *
 * @type {Object}
 */
const statusCodeMap = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  locked: 423,
  internalServerError: 500,
  notImplemented: 501
}

/**
 * Makes the respond middleware. All options are optional.
 *
 * @param {object} opts
 * Options object.
 *
 * @param {object} opts.statusMethods
 * An object where keys maps to method names, and
 * values map to the status code.
 *
 * @return {Function}
 */
function makeRespondMiddleware(opts) {
  opts = Object.assign({}, opts)

  // Make the respond function.
  const respond = makeRespond(opts)

  /**
   * Installs the functions in the context.
   *
   * @param  {KoaContext} ctx
   */
  function patch(ctx) {
    const statusMethods = Object.assign({}, opts.statusMethods, statusCodeMap)
    ctx.send = respond.bind(ctx, ctx)

    // Bind status methods.
    for (const method in statusMethods) {
      const code = statusMethods[method]
      ctx[method] = respond.bind(ctx, ctx, code)
    }

    // Bind other methods
    const methods = Object.assign({}, opts.methods)
    for (const method in methods) {
      const fn = methods[method]
      ctx[method] = fn.bind(ctx, ctx)
    }

    return ctx
  }

  /**
   * The respond middleware adds the methods to the context.
   *
   * @param  {KoaContext} ctx
   */
  function respondMiddleware(ctx, next) {
    patch(ctx)
    return next()
  }

  // Tack on the patch method to allow Koa 1 users
  // to install it, too.
  respondMiddleware.patch = patch
  return respondMiddleware
}

module.exports = makeRespondMiddleware

// Expose these for the tests.
module.exports.statusCodeMap = statusCodeMap
