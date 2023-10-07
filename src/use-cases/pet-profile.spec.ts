import { InMemoryPetsImagesRepository } from "@/repositories/in-memory/in-memory-pets-images-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryPetsRequirementsForAdoptionRepository } from "@/repositories/in-memory/in-memory-pets-requirements-for-adoption-repository";
import { beforeEach, describe, it, expect } from "vitest";
import { PetProfileUseCase } from "./pet-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let petsRepository: InMemoryPetsRepository
let petsImagesRepository: InMemoryPetsImagesRepository
let petsRequirementsForAdoptionRepository: InMemoryPetsRequirementsForAdoptionRepository
let sut: PetProfileUseCase

describe('Pet Profile use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petsImagesRepository = new InMemoryPetsImagesRepository()
    petsRequirementsForAdoptionRepository = new InMemoryPetsRequirementsForAdoptionRepository()
    sut = new PetProfileUseCase(petsRepository, petsImagesRepository, petsRequirementsForAdoptionRepository)
  })

  it('should be able to show a pet profile', async () => {
    const pet = await petsRepository.create({
      name: 'Pet Test',
      age: "ADULT",
      energy: "HIGH",
      environment: "MEDIUM",
      independence: "AVERAGE",
      stature: "BIG",
      about: "",
      organization_id: "123"
    })

    await petsImagesRepository.create({
      pet_id: pet.id,
      image_name: 'Img1',
      path: 'pathtest1',
    })

    await petsImagesRepository.create({
      pet_id: pet.id,
      image_name: 'Img2',
      path: 'pathtest2',
    })

    await petsRequirementsForAdoptionRepository.create({
      pet_id: pet.id,
      requirement: 'Requirement1'
    })

    await petsRequirementsForAdoptionRepository.create({
      pet_id: pet.id,
      requirement: 'Requirement2'
    })

    const { petProfile } = await sut.execute({ petId: pet.id })

    expect(petProfile.petInfo.id).toEqual(expect.any(String))
    expect(petProfile.petImages).toHaveLength(2)
    expect(petProfile.requirementsForAdoption).toHaveLength(2)

  })

  it("should not be able to show a profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        petId: "non-existing-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})