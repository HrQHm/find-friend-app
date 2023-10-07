import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListAllPetsUseCase } from "./list-all-pets";
import { randomUUID } from "crypto";

let petsRepository: InMemoryPetsRepository
let sut: ListAllPetsUseCase

describe("List all pets use case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new ListAllPetsUseCase(petsRepository)
  })

  it("should be able to list all pets by city", async () => {
    const organizationId = randomUUID()
    petsRepository.organizations.push({
      id: organizationId,
      name: 'Organization Test',
      owner: 'User Test',
      email: 'user@test.com',
      cep: '9999999',
      address: '',
      city: 'City Test',
      uf: '',
      whatsapp: '99 999999999',
      password_hash: '123456',
      created_at: new Date()
    })

    await petsRepository.create({
      name: 'Pet Test',
      age: "ADULT",
      energy: "HIGH",
      environment: "MEDIUM",
      independence: "AVERAGE",
      stature: "BIG",
      about: "",
      organization_id: organizationId
    })

    await petsRepository.create({
      name: 'Pet Test2',
      age: "ADULT",
      energy: "HIGH",
      environment: "MEDIUM",
      independence: "AVERAGE",
      stature: "BIG",
      about: "",
      organization_id: organizationId
    })

    const { pets } = await sut.execute({ city: 'City Test' })
    expect(pets).toHaveLength(2)
  })
})