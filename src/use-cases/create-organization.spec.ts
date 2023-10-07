import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create a new organizaiton', async () => {
    const { organization } = await sut.execute({
      name: 'Organization Test',
      owner: 'User Test',
      email: 'user@test.com',
      cep: '9999999',
      address: '',
      city: '',
      uf: '',
      whatsapp: '99 999999999',
      password: '123456'
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'Organization Test',
      owner: 'User Test',
      email: 'user@test.com',
      cep: '9999999',
      address: '',
      city: '',
      uf: '',
      whatsapp: '99 999999999',
      password: '123456'
    })

    await expect(() =>
      sut.execute({
        name: 'Organization Test2',
        owner: 'User Test',
        email: 'user@test.com',
        cep: '9999999',
        address: '',
        city: '',
        uf: '',
        whatsapp: '99 999999999',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Organization Test',
      owner: 'User Test',
      email: 'user@test.com',
      cep: '9999999',
      address: '',
      city: '',
      uf: '',
      whatsapp: '99 999999999',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})