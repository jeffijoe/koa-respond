'use strict';
const respond = require('./respond');

/**
 * Makes the respond middleware
 *
 * @return {Function}
 */
function makeRespondMiddleware() {
  /**
   * Installs the functions in the context.
   *
   * @param  {KoaContext} ctx
   */
  function patch(ctx) {

  }

  /**
   * The respond middleware adds the methods to the context.
   *
   * @param  {KoaContext} ctx
   */
  function respondMiddleware(ctx, next) {
    patch(ctx);
    return next();
  }

  // Tack on the patch method to allow Koa 1 users
  // to install it, too.
  respondMiddleware.patch = patch;
  return respondMiddleware;
}

module.exports = makeRespondMiddleware;