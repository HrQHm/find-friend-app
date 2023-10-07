import { PetImage, Prisma } from "@prisma/client";
import { PetsImagesRepository } from "../pets-images-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsImagesRepository implements PetsImagesRepository {
  public items: PetImage[] = []

  async create(data: Prisma.PetImageUncheckedCreateInput): Promise<void> {
    const image = {
      id: data.id ?? randomUUID(),
      image_name: data.image_name,
      path: data.path,
      created_at: new Date(),
      pet_id: data.pet_id
    }

    this.items.push(image)
  }

  async listById(pet_id: string): Promise<PetImage[]> {
    return this.items.filter(item => item.pet_id === pet_id)
  }

}