import { Prisma, RequirementsForAdoption } from "@prisma/client";

export interface PetsRequirementsForAdoptionRepository {
  create(data: Prisma.RequirementsForAdoptionUncheckedCreateInput): Promise<void>
  listById(pet_id: string): Promise<RequirementsForAdoption[]>
}