'use strict'

const makeRespond = require('../../lib/respond')

const respond = makeRespond()
const respondNoAutomessage = makeRespond({
  autoMessage: false
})

describe('respond', function() {
  let ctx

  beforeEach(function() {
    ctx = {
      status: 404,
      body: 'unset'
    }
  })

  it('sets the status on the context', function() {
    respond(ctx, 200)
    ctx.status.should.equal(200)
    ctx.body.should.equal('unset')
  })

  it('returns the given context', function() {
    const result = respond(ctx, 400)
    result.should.equal(ctx)
  })

  describe('when payload is a string', function() {
    it('sets an object with a message property', function() {
      respond(ctx, 200, 'A fine body')
      ctx.status.should.equal(200)
      ctx.body.should.deep.equal({ message: 'A fine body' })
    })
  })

  describe('when payload is anything but a string', function() {
    it('passes it through as-is', function() {
      const obj = { id: 123, name: 'koa-respond' }
      respond(ctx, 200, obj)
      ctx.status.should.equal(200)
      ctx.body.should.deep.equal(obj)
    })
  })

  describe('when autoMessage = false', function() {
    it('does not wrap strings', function() {
      respondNoAutomessage(ctx, 200, 'Hello world')
      ctx.body.should.equal('Hello world')
    })
  })
})
