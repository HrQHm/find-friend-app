import { PrismaPetsImagesRepository } from "@/repositories/prisma/prisma-pets-images-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaPetsRequirementsForAdoptionRepository } from "@/repositories/prisma/prisma-pets-requirements-for-adoption-repository";
import { RegisterPetUseCase } from "../register-pet-with-images";

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const requirementsForAdoptionRepository = new PrismaPetsRequirementsForAdoptionRepository()
  const petImagesRepository = new PrismaPetsImagesRepository()
  const registerPetUseCase = new RegisterPetUseCase(petsRepository, petImagesRepository, requirementsForAdoptionRepository)
  return registerPetUseCase
}