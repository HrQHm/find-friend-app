import { OrganizationAlreadyExistsError } from "@/use-cases/errors/organization-already-exists-error";
import { makeCreateOrganizationUseCase } from "@/use-cases/factories/make-create-organization-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    owner: z.string(),
    email: z.string().email(),
    cep: z.string(),
    address: z.string(),
    city: z.string(),
    uf: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6)
  })

  const {
    name,
    owner,
    email,
    cep,
    address,
    city,
    uf,
    whatsapp,
    password
  } = createBodySchema.parse(request.body)

  try {
    const createOrganizationUseCase = makeCreateOrganizationUseCase()
    await createOrganizationUseCase.execute({
      name,
      owner,
      email,
      cep,
      address,
      city,
      uf,
      whatsapp,
      password
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message
      })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}