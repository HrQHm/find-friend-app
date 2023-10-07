import { PetImage, Prisma } from "@prisma/client";
import { PetsImagesRepository } from "../pets-images-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsImagesRepository implements PetsImagesRepository {
  async create(data: Prisma.PetImageUncheckedCreateInput): Promise<void> {
    await prisma.petImage.create({
      data
    })
  }

  async listById(pet_id: string): Promise<PetImage[]> {
    const images = await prisma.petImage.findMany({
      where: {
        pet_id
      }
    })

    return images
  }

}