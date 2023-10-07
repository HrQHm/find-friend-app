import { PetImage, Prisma } from "@prisma/client";

export interface PetsImagesRepository {
  create(data: Prisma.PetImageUncheckedCreateInput): Promise<void>
  listById(pet_id: string): Promise<PetImage[]>
}