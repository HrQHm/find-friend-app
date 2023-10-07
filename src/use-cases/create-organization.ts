import { OrganizationsRepository } from "@/repositories/organizations-repository"
import { Organization } from "@prisma/client"
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error"

interface CreateOrganizationUseCaseRequest {
  name: string
  owner: string
  email: string
  cep: string
  address: string
  city: string
  uf: string
  whatsapp: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository
  ) {}

  async execute({
    name,
    owner,
    email,
    cep,
    address,
    city,
    uf,
    whatsapp,
    password
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }
    const organization = await this.organizationsRepository.create({
      name,
      owner,
      email,
      cep,
      address,
      city,
      uf,
      whatsapp,
      password_hash
    })



    return {
      organization
    }
  }
}