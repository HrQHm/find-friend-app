import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchPetByCharacteristicsUseCase } from "../fetch-pet-by-characteristics";

export function makeFetchPetByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetByCharacteristicsUseCase = new FetchPetByCharacteristicsUseCase(petsRepository)
  return fetchPetByCharacteristicsUseCase
}