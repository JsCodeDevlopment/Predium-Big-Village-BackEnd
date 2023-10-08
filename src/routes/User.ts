import { Users } from "@prisma/client";
import { prisma } from "../database/prismaClient";
import { FastifyInstance } from "fastify";

export async function user(fastify: FastifyInstance) {
  // Rota para criar um usuário.
  fastify.post("/createuser", async (req, resp) => {
    try {
      const { password, personId, type } = req.body as Users;

      const newUser = await prisma.users.create({
        data: { password, personId, type },
      });
      return newUser;
    } catch (error) {
      resp.status(500).send("Deu merda!");
    }
  });
  // Rota para exibir todos os usuários
 fastify.get('/user', async (request, reply) => {
  try {
    const user = await prisma.people.findMany();

    return user;
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({ error: 'Erro ao obter os apartamentos' });
  }
});
}
