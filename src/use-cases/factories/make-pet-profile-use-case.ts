import { PrismaPetsImagesRepository } from "@/repositories/prisma/prisma-pets-images-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaPetsRequirementsForAdoptionRepository } from "@/repositories/prisma/prisma-pets-requirements-for-adoption-repository";
import { PetProfileUseCase } from "../pet-profile";

export function makePetProfileUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const requirementsForAdoptionRepository = new PrismaPetsRequirementsForAdoptionRepository()
  const petImagesRepository = new PrismaPetsImagesRepository()
  const petProfileUseCase = new PetProfileUseCase(petsRepository, petImagesRepository, requirementsForAdoptionRepository)
  return petProfileUseCase
}