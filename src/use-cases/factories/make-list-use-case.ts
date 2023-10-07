import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { ListAllPetsUseCase } from "../list-all-pets";

export function makeListUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const listUseCase = new ListAllPetsUseCase(petsRepository)
  return listUseCase
}