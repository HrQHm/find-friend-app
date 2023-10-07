import { makeListUseCase } from "@/use-cases/factories/make-list-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listQuerySchema = z.object({
    city: z.string()
  })
  const { city } = listQuerySchema.parse(request.query)

  const listUseCase = makeListUseCase()
  const pets = await listUseCase.execute({ city })

  return reply.status(200).send({
    pets
  })
}