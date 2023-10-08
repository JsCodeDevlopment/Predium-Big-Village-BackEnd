import { Apartments } from "@prisma/client";
import { prisma } from "../database/prismaClient";
import { FastifyInstance } from "fastify";

export async function apartaments(fastify: FastifyInstance) {
  // Rota para criar um usuário.
    fastify.post("/createnewapartament", async (req, resp) => {
    try {
      const { number, block } = req.body as Apartments;

      const newApartament = await prisma.apartments.create({
        data: {
          number,
          block
        },
      });
      return newApartament;
    } catch (error) {
      resp.status(500).send("Deu merda!");
    }
  });
 // Rota para exibir todos os apartamentos
 fastify.get('/apartments', async (request, reply) => {
    try {
      const apartments = await prisma.apartments.findMany();
  
      return apartments;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Erro ao obter os apartamentos' });
    }
  });
}
