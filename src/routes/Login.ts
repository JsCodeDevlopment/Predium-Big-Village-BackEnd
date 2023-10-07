import { Users } from "@prisma/client";
import { prisma } from "../database/prismaClient";
import { FastifyInstance } from "fastify";
interface Login {
    email: string,
    password: string
}
export async function login(fastify: FastifyInstance) {
  // Rota para criar um usuário.
  fastify.post("/login", async (req, resp) => {
    try {
      const { email ,password } = req.body as Login;

      const person = await prisma.people.findFirst({
        where: {
            email
        },
        include: {
            User: true
        }
      });
      if (!person) {
        resp.status(404).send("Email ou senha inválido")
      }
      if (person?.User?.password !== password) {
        resp.status(404).send("Email ou senha inválido")
      }
      return {
        login: true
      };
    } catch (error) {
      resp.status(500).send("Deu merda!");
    }
  });
}