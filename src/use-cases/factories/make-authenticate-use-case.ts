import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

  return authenticateUseCase
}