import { makePetProfileUseCase } from "@/use-cases/factories/make-pet-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function petProfile(request: FastifyRequest, reply: FastifyReply) {
  const petProfileQuerySchema = z.object({
    petId: z.string()
  })

  const { petId } = petProfileQuerySchema.parse(request.query)
  const petProfileUseCase = makePetProfileUseCase()
  const pet = await petProfileUseCase.execute({ petId })

  return reply.status(200).send({
    pet
  })
}