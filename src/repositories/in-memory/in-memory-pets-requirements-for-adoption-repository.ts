import { Prisma, RequirementsForAdoption } from "@prisma/client";
import { PetsRequirementsForAdoptionRepository } from "../pets-requirements-for-adoption-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRequirementsForAdoptionRepository implements PetsRequirementsForAdoptionRepository {

  public items: RequirementsForAdoption[] = []

  async create(data: Prisma.RequirementsForAdoptionUncheckedCreateInput): Promise<void> {
    const requirement = {
      id: data.id ?? randomUUID(),
      requirement: data.requirement,
      created_at: new Date(),
      pet_id: data.pet_id
    }

    this.items.push(requirement)
  }

  async listById(pet_id: string): Promise<RequirementsForAdoption[]> {
    return this.items.filter((item) => item.pet_id === pet_id)
  }

}