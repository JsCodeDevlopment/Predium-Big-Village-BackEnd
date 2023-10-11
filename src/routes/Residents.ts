import { FastifyInstance } from "fastify";
import { prisma } from "../database/prismaClient";
import { Pets, Residents } from "@prisma/client";

export async function Residents(fastify: FastifyInstance) {
  // Rota para criar um residente.
  fastify.post("/newresident", async (req, resp) => {
    try {
      const { accessTag, apartmentId, personId, type } =
        req.body as Residents;

      const newResident = await prisma.residents.create({
        data: {
          accessTag,
          apartmentId,
          personId,
          type
        },
      });
      return newResident;
    } catch (error) {
      resp.status(500).send("Deu merda!");
    }
  });
  // Rota para exibir todos os residentes
  fastify.get("/residents", async (request, reply) => {
    try {
      const residents = await prisma.residents.findMany();

      return residents;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: "Erro ao obter os apartamentos" });
    }
  });
  // Rota para exibir um unico residente
  fastify.get("/resident/:id", async (req, resp) => {
    try {
      const { id } = req.params as { id: string };
      const resident = await prisma.residents.findUnique({
        where: {
          id: id,
        },
      });
      if (!resident) {
        return resp.status(404).send("Usuário não encontrado");
      }
      await prisma.residents.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      resp.status(500).send("Ocorreu um erro ao deletar o usuário.");
    }
  });
}
