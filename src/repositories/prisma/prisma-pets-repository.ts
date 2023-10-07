import { Prisma, $Enums, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }

  async listAllPetsByCity(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city
        }
      }
    })

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })

    return pet
  }

  async findByCharacteristics(age: $Enums.Age, stature: $Enums.Stature, independence: $Enums.Independence, energy: $Enums.Energy, environment: $Enums.Environment): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        stature,
        independence,
        energy,
        environment
      }
    })

    return pets
  }

}