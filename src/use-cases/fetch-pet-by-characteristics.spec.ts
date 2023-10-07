import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetByCharacteristicsUseCase } from "./fetch-pet-by-characteristics";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { randomUUID } from "crypto";

let petsRepository: InMemoryPetsRepository
let sut: FetchPetByCharacteristicsUseCase


describe('Fetch Pet By characteristics', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetByCharacteristicsUseCase(petsRepository)
  })

  it("Should be able to fetch pet by his characteristics", async () => {
    await petsRepository.create({
      name: 'Pet Test 1',
      age: "ADULT",
      energy: "HIGH",
      environment: "MEDIUM",
      independence: "AVERAGE",
      stature: "BIG",
      about: "",
      organization_id: randomUUID()
    })

    await petsRepository.create({
      name: 'Pet Test 2',
      age: "OLD",
      energy: "LOW",
      environment: "SMALL",
      independence: "LOW",
      stature: "MEDIUM",
      about: "",
      organization_id: randomUUID()
    })

    const { pet } = await sut.execute({
      age: "OLD",
      energy: "LOW",
      environment: "SMALL",
      independence: "LOW",
      stature: "MEDIUM"
    })

    expect(pet).toEqual([
      expect.objectContaining({ name: 'Pet Test 2' })
    ])
  })


})