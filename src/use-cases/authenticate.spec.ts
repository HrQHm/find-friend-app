import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      name: 'Organization Test',
      owner: 'User Test',
      email: 'user@test.com',
      cep: '9999999',
      address: '',
      whatsapp: '99 999999999',
      password_hash: await hash('123456', 6)
    })

    const { organization } = await sut.execute({
      email: 'user@test.com',
      password: '123456'
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'user@test.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      name: 'Organization Test',
      owner: 'User Test',
      email: 'user@test.com',
      cep: '9999999',
      address: '',
      whatsapp: '99 999999999',
      password_hash: await hash('123456', 6)
    })

    await expect(() =>
      sut.execute({
        email: 'user@test.com',
        password: '12345'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})