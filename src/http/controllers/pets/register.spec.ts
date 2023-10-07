import { describe, beforeAll, afterAll, it, expect } from "vitest";
import request from 'supertest'
import { app } from "@/app";

describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
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