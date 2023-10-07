import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { register } from "./register";
import { list } from "./list";
import { petProfile } from "./pet-profile";
import { search } from "./search";

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', register)
  app.get('/list', list)
  app.get('/pet', petProfile)
  app.get('/pet/search', search)
}