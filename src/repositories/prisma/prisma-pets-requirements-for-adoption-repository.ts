import { Prisma, RequirementsForAdoption } from "@prisma/client";
import { PetsRequirementsForAdoptionRepository } from "../pets-requirements-for-adoption-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRequirementsForAdoptionRepository implements PetsRequirementsForAdoptionRepository {
  async create(data: Prisma.RequirementsForAdoptionUncheckedCreateInput): Promise<void> {
    await prisma.requirementsForAdoption.create({
      data
    })
  }

  async listById(pet_id: string): Promise<RequirementsForAdoption[]> {
    const requirementsForAdoption = await prisma.requirementsForAdoption.findMany({
      where: {
        pet_id
      }
    })

    return requirementsForAdoption
  }

}