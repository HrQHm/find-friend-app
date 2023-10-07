import { makeFetchPetByCharacteristicsUseCase } from "@/use-cases/factories/make-fetch-pet-by-characteristics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchBodySchema = z.object({
    age: z.enum(['PUPPY', 'ADULT', 'OLD']),
    stature: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    energy: z.enum(['MEDIUM', 'LOW', 'HIGH']),
    environment: z.enum(['SMALL', 'MEDIUM', 'WIDE']),
    independence: z.enum(['LOW', 'HIGH', 'AVERAGE'])
  })

  const { age, stature, energy, environment, independence } = searchBodySchema.parse(request.body)
  const fetchPetByCharacteristicsUseCase = makeFetchPetByCharacteristicsUseCase()
  const pets = await fetchPetByCharacteristicsUseCase.execute({
    age,
    stature,
    energy,
    environment,
    independence
  })

  return reply.status(200).send({
    pets
  })
}