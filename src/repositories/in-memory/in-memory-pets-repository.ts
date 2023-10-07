import { Prisma, Pet, Organization, $Enums } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {

  public items: Pet[] = []
  public organizations: Organization[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      age: data.age,
      stature: data.stature,
      independence: data.independence,
      energy: data.energy,
      environment: data.environment,
      about: data.about,
      organization_id: data.organization_id,
      created_at: new Date()
    }

    this.items.push(pet)
    return pet
  }

  async listAllPetsByCity(city: string): Promise<Pet[]> {
    const organizations = this.organizations.filter((organization) => organization.city === city)

    const filteredOrganizations = this.items.filter((item) =>
      organizations.some((idObj) => idObj.id === item.organization_id)
    );

    return filteredOrganizations
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) {
      return null
    }

    return pet
  }

  async findByCharacteristics(age: $Enums.Age, stature: $Enums.Stature, independence: $Enums.Independence, energy: $Enums.Energy, environment: $Enums.Environment): Promise<Pet[]> {
    const pet = this.items.filter((item) => {
      const ageMatch = item.age === age
      const energyMatch = item.energy === energy
      const statureMatch = item.stature === stature
      const independenceMatch = item.independence === independence
      const environmentMatch = item.environment === environment
      return ageMatch && energyMatch && statureMatch && independenceMatch && environmentMatch;
    })


    return pet
  }

}