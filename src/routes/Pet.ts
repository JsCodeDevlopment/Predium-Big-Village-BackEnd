import { FastifyInstance } from "fastify";
import { prisma } from "../database/prismaClient";
import { Pets } from "@prisma/client";

export async function pet(fastify: FastifyInstance) {
  // Rota para criar um pet.
  fastify.post("/newpet", async (req, resp) => {
    try {
      const { name, type, residentId, age, breed, notes, size, weight } =
        req.body as Pets;

      const newPet = await prisma.pets.create({
        data: {
          name,
          type,
          residentId,
          age,
          breed,
          notes,
          size,
          weight,
        },
      });
      return newPet;
    } catch (error) {
      resp.status(500).send("Deu merda!");
    }
  });
  // Rota para exibir todos os pets
  fastify.get("/pets", async (request, reply) => {
    try {
      const pets = await prisma.pets.findMany();

      return pets;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: "Erro ao obter os apartamentos" });
    }
  });
  // Rota para deletar um unico pet
  fastify.delete("/pets/:id", async (req, resp) => {
    try {
      const { id } = req.params as { id: string };
      const pet = await prisma.pets.findUnique({
        where: {
          id: id,
        },
      });
      if (!pet) {
        return resp.status(404).send("Usuário não encontrado");
      }
      await prisma.pets.delete({
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
