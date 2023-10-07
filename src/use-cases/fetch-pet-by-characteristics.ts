import { PetsRepository } from "@/repositories/pets-repository";
import { Age, Energy, Environment, Independence, Pet, Stature } from "@prisma/client";


interface FetchPetByCharacteristicsUseCaseRequest {
  age: Age
  stature: Stature
  independence: Independence
  energy: Energy
  environment: Environment
}

interface FetchPetByCharacteristicsUseCaseResponse {
  pet: Pet[]
}

export class FetchPetByCharacteristicsUseCase {
  constructor(
    private petsRepository: PetsRepository
  ) {}

  async execute({
    age,
    stature,
    independence,
    energy,
    environment
  }: FetchPetByCharacteristicsUseCaseRequest): Promise<FetchPetByCharacteristicsUseCaseResponse> {
    const pet = await this.petsRepository.findByCharacteristics(age, stature, independence, energy, environment)

    return {
      pet
    }
  }
}