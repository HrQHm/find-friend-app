import { InMemoryPetsImagesRepository } from "@/repositories/in-memory/in-memory-pets-images-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryPetsRequirementsForAdoptionRepository } from "@/repositories/in-memory/in-memory-pets-requirements-for-adoption-repository";
import { beforeEach, describe, it, expect } from "vitest";
import { RegisterPetUseCase } from "./register-pet-with-images";

let petsRepository: InMemoryPetsRepository
let petsImagesRepository: InMemoryPetsImagesRepository
let petsRequirementsForAdoptionRepository: InMemoryPetsRequirementsForAdoptionRepository
let sut: RegisterPetUseCase

describe('Create pet register with image use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petsImagesRepository = new InMemoryPetsImagesRepository()
    petsRequirementsForAdoptionRepository = new InMemoryPetsRequirementsForAdoptionRepository()
    sut = new RegisterPetUseCase(petsRepository, petsImagesRepository, petsRequirementsForAdoptionRepository)
  })

  it('should be able to register a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'Pet Test',
      age: "ADULT",
      energy: "HIGH",
      environment: "MEDIUM",
      independence: "AVERAGE",
      stature: "BIG",
      about: "",
      images_paths: [{ fileName: 'Img1', path: 'Img1.txt' }, { fileName: 'Img1', path: 'Img1.txt' }],
      requirements_for_adoption: ["Requirement1", "Requirement2"],
      organization_id: "123"
    })

    const petImages = await petsImagesRepository.listById(pet.id)
    const requirementsForAdoption = await petsRequirementsForAdoptionRepository.listById(pet.id)

    expect(pet.id).toEqual(expect.any(String))
    expect(petImages).toHaveLength(2)
    expect(requirementsForAdoption).toHaveLength(2)
  })
})