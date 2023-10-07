import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe('Create organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a organization', async () => {
    const response = await request(app.server)
      .post('/organizations')
      .send({
        name: "Organization1",
        owner: "Jhon Doe",
        email: "jhondoe@organization.com",
        cep: "99999999",
        address: "Test Address",
        city: "Teste",
        uf: "TS",
        whatsapp: "999999999",
        password: "123456"
      })

    expect(response.statusCode).toEqual(201)
  })
})