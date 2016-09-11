'use strict'

const respond = require('../../lib/koa-respond')
const supertest = require('supertest')
const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa()
const router = new KoaRouter()

app.use(respond())

for (const method in respond.statusCodeMap) {
  router.get(`/${method}`, (ctx) => {
    ctx[method]({ message: 'hello' })
  })
}

app.use(router.routes())
const request = supertest(app.callback())

for (const method in respond.statusCodeMap) {
  const code = respond.statusCodeMap[method]
  if (code === 204) continue
  describe(`ctx.${method}`, function () {
    it(`sets the code to ${code}`, function () {
      return request.get(`/${method}`)
        .expect(code)
        .expect({ message: 'hello' })
    })
  })
}

describe('ctx.noContent', function () {
  it('sets the code to 204 and has no content', function () {
    return request.get('/noContent')
      .expect(204)
      .end(res => {
        expect(res.body).to.be.null
      })
  })
})
