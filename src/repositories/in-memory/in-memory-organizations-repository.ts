import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";
import { randomUUID } from "crypto";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {

  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      owner: data.owner,
      email: data.email,
      cep: data.cep,
      address: data.address,
      city: data.city,
      uf: data.uf,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.items.push(organization)
    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

}