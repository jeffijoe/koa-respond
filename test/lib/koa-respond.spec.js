'use strict'
const respond = require('../../lib/koa-respond')

describe('koa-respond', function () {
  let ctx

  function use (middleware) {
    middleware(ctx, () => Promise.resolve())
  }

  beforeEach(function () {
    ctx = {
      status: 404
    }
  })

  it('exists', function () {
    expect(respond).to.exist
  })

  it('adds a send method', function () {
    use(respond())
    ctx.send.should.be.a.function
  })

  describe('ctx.respond', function () {
    it('sets the status and body', function () {
      use(respond())
      ctx.send(200, { id: 123 })
      ctx.status.should.equal(200)
      ctx.body.should.deep.equal({ id: 123 })
    })
  })

  describe('statusMethods option', function () {
    it('adds custom methods', function () {
      use(respond({
        statusMethods: {
          imATeapot: 418,
          nope: 503
        }
      }))

      ctx.imATeapot('funny')
      ctx.status.should.equal(418)
      ctx.body.should.deep.equal({ message: 'funny' })

      ctx.nope('offline')
      ctx.status.should.equal(503)
      ctx.body.should.deep.equal({ message: 'offline' })
    })
  })

  describe('methods option', function () {
    it('adds custom methods', function () {
      use(respond({
        methods: {
          caps: (input, message) => {
            input.should.equal(ctx)
            input.send(200, message.toUpperCase())
          }
        }
      }))

      ctx.caps('never gonna give you up')
      ctx.status.should.equal(200)
      ctx.body.message.should.equal('NEVER GONNA GIVE YOU UP')
    })
  })

  // Generate tests for the built-in status codes.
  for (const method in respond.statusCodeMap) {
    const code = respond.statusCodeMap[method]
    describe(`ctx.${method}`, function () {
      it(`sets the status to ${code}`, function () {
        use(respond())
        ctx[method]({ id: 123 })
        ctx.status.should.equal(code)
        if (code === 204) {
          expect(ctx.body).to.be.null
        } else {
          ctx.body.should.deep.equal({ id: 123 })
        }
      })
    })
  }
})
