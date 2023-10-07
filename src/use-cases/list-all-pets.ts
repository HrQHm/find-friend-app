import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface ListAllPetsUseCaseRequest {
  city: string
}

interface ListAllPetsUseCaseResponse {
  pets: Pet[]
}

export class ListAllPetsUseCase {
  constructor(
    private petsRepository: PetsRepository
  ) {}

  async execute({ city }: ListAllPetsUseCaseRequest): Promise<ListAllPetsUseCaseResponse> {
    const pets = await this.petsRepository.listAllPetsByCity(city)

    return {
      pets
    }
  }
}