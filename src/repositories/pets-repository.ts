import { Age, Energy, Independence, Pet, Prisma, Stature, Environment } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  listAllPetsByCity(city: string): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  findByCharacteristics(age: Age, stature: Stature, independence: Independence, energy: Energy, environment: Environment): Promise<Pet[]>
}