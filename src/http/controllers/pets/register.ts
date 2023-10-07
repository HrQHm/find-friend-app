import { makeRegisterPetUseCase } from "@/use-cases/factories/make-register-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import fs from "node:fs";
import { z } from "zod";

const pump = promisify(pipeline);

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const petInformationSchema = z.object({
    name: z.string(),
    age: z.enum(['PUPPY', 'ADULT', 'OLD']).default('ADULT'),
    stature: z.enum(['SMALL', 'MEDIUM', 'BIG']).default('MEDIUM'),
    independence: z.enum(['LOW', 'AVERAGE', 'HIGH']).default('AVERAGE'),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    environment: z.enum(['SMALL', 'MEDIUM', 'WIDE']).default('MEDIUM'),
    about: z.string(),
  })

  const requirementsForAdoptionSchema = z.array(z.string())

  const fileImageSchema = z.object({
    filename: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    file: z.string(),
    fieldname: z.string(),
    transferEncoding: z.string(),
    headers: z.record(z.string()),
  });

  const imagePetSchema = z.array(fileImageSchema);

  const requestDataSchema = z.object({
    petData: petInformationSchema,
    requirementsForAdoption: requirementsForAdoptionSchema,
    petImages: imagePetSchema
  })

  const { petData, requirementsForAdoption, petImages } = requestDataSchema.parse(request.body)

  const petImagesFiles = petImages.map((petImage) => {
    const extension = path.extname(petImage.filename)
    const fileBaseName = path.basename(petImage.filename, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

    return {
      fileName: petImage.filename,
      path: path.resolve(__dirname, '../../../../tmp', fileUploadName),
      file: petImage.file
    }
  })

  for await (const part of petImagesFiles) {
    await pump(part.file, fs.createWriteStream(part.path))
  }

  console.log(request.user)
  const petImagesFilesUseCaseParameter = petImagesFiles.map((petImage) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { file, ...data } = petImage
    return data
  })

  const registerPetUseCase = makeRegisterPetUseCase()
  await registerPetUseCase.execute({
    name: petData.name,
    about: petData.about,
    age: petData.age,
    energy: petData.energy,
    environment: petData.environment,
    stature: petData.stature,
    independence: petData.independence,
    organization_id: request.user.sub,
    requirements_for_adoption: requirementsForAdoption,
    images_paths: petImagesFilesUseCaseParameter
  })
  return reply.status(201).send()
}
