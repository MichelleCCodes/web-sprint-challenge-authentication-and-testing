const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

const me = {username:"mchen", password:"lambduhskool"}

it('sanity', () => {
  expect(2).toBe(2)
})

beforeAll(async ()=> {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async ()=> {
  await db("users").truncate()
})

afterAll(async ()=> {
  await db.destroy()
})

describe("server path", ()=> {
    it("[GET] / responds with 200 status", async()=> {
      const res = await request(server).get("/") 
      expect(res.status).toEqual(200)
    it("response includes message", ()=> {
      const res = await request(server).get("/")
      expect(res.json).toHaveProperty('message')
    })
  })
})

describe("auth path", ()=> {
    it("[POST] /auth/register responds with status 201", async ()=> {
      let res
      res = await request(server).post("/api/auth/register").send(me)
      expect(res.status).toBe(201)
  })
    it("responds with newly created user", async ()=> {
      let res
      res = await request(server).post("/api/auth/register").send(me)
      expect(res.body).toMatchObject({username:"mchen", ...me})
  })
})

describe("jokes path", ()=> {
    it("responds with 200 status", async()=> {
      const res = await request(server).get("/") 
      expect(res.status).toEqual(200)
  })
  it("[GET] /api/jokes returns all the jokes", async()=> {
    res = await request(server).get("/api/jokes")
    expect(res.body).toHaveLength(3)
})
})