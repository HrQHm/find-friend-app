import { PetsImagesRepository } from "@/repositories/pets-images-repository"
import { PetsRepository } from "@/repositories/pets-repository"
import { PetsRequirementsForAdoptionRepository } from "@/repositories/pets-requirements-for-adoption-repository"
import { Pet, PetImage, RequirementsForAdoption } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface PetProfileUseCaseRequest {
  petId: string
}

interface PetProfileUseCaseResponse {
  petProfile: {
    petInfo: Pet,
    petImages: PetImage[],
    requirementsForAdoption: RequirementsForAdoption[]
  }
}

export class PetProfileUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private petsImagesRepository: PetsImagesRepository,
    private petsRequirementsForAdoptionRepository: PetsRequirementsForAdoptionRepository
  ) {}

  async execute({ petId }: PetProfileUseCaseRequest): Promise<PetProfileUseCaseResponse> {
    const petInfo = await this.petsRepository.findById(petId)

    if (!petInfo) {
      throw new ResourceNotFoundError()
    }

    const petImages = await this.petsImagesRepository.listById(petId)
    const requirementsForAdoption = await this.petsRequirementsForAdoptionRepository.listById(petId)

    return {
      petProfile: {
        petInfo,
        petImages,
        requirementsForAdoption
      }
    }

  }
}