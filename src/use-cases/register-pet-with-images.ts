import { PetsImagesRepository } from "@/repositories/pets-images-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { PetsRequirementsForAdoptionRepository } from "@/repositories/pets-requirements-for-adoption-repository";
import { Age, Energy, Independence, Pet, Stature, Environment } from "@prisma/client";

type ImagePet = {
  fileName: string
  path: string
}

interface CreatePetUseCaseRequest {
  name: string
  age: Age
  stature: Stature
  independence: Independence
  energy: Energy
  environment: Environment
  about: string,
  organization_id: string,
  images_paths: ImagePet[],
  requirements_for_adoption: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private petsImagesRepository: PetsImagesRepository,
    private petsRequirementsForAdoptionRepository: PetsRequirementsForAdoptionRepository
  ) {}

  async execute({
    name,
    age,
    stature,
    independence,
    energy,
    environment,
    about,
    organization_id,
    images_paths,
    requirements_for_adoption
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      age,
      stature,
      independence,
      energy,
      environment,
      about,
      organization_id,
    })

    for (const image of images_paths) {

      await this.petsImagesRepository.create({
        image_name: image.fileName,
        path: image.path,
        pet_id: pet.id
      })
    }

    for (const requirement of requirements_for_adoption) {
      await this.petsRequirementsForAdoptionRepository.create({
        requirement,
        pet_id: pet.id
      })
    }

    return {
      pet
    }
  }
}