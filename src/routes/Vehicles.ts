import { FastifyInstance } from "fastify";
import { prisma } from "../database/prismaClient";
import { Vehicles } from "@prisma/client";

export async function Vehicles(fastify: FastifyInstance) {
  // Rota para criar um aviso.
  fastify.post("/vehicles/:number", async (req, resp) => {
    try {
      const { number } = req.params as { number: string };

      if (isNaN(+number)) {
        resp.status(400).send("Insira um número de apartamento válido!");
        return;
      }

      const apartmentId = (
        await prisma.apartments.findFirst({
          where: {
            number: +number,
          },
        })
      )?.id;

      if (!apartmentId) {
        resp.status(404).send("Nenhum apartamento encontrado!");
        return;
      }

      const { brand, model, plate, type, cpf } = req.body as Vehicles & {cpf: string};

      const person = await prisma.people.findUnique({
        where: {
            cpf
        }
      })
      if (!person) {
        resp.status(404).send("Nenhum CPF encontrado!");
        return;
      }

      const numberOfVehicles = await prisma.vehicles.count({
        where: {
          peopleId: person.id
        }
      });
      
      if (numberOfVehicles >= 2) {
        resp.status(400).send("Essa pessoa já possui 2 veículos. Não é permitido adicionar mais.");
        return;
      }

      const newVehicle = await prisma.vehicles.create({
        data: {
            brand,
            model,
            plate,
            type,
            apartmentId,
            peopleId: person.id
        },
      });
      return newVehicle;
    } catch (error) {
      resp.status(500).send("Deu merda!");
      console.log(error)
    }
  });
  // Rota para exibir todos os veículos
  fastify.get("/vehicles", async (req, reply) => {
    try {
      const vehicles = await prisma.vehicles.findMany();

      return vehicles;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: "Erro ao obter os veículos" });
    }
  })
  // Rota para deletar um aviso.
  fastify.delete("/vehicles/:id", async (req, resp) => {
    try {
      const { id } = req.params as { id: string };
      const vehicles = await prisma.vehicles.findUnique({
        where: {
          id: id,
        },
      });
      if (!vehicles) {
        return resp.status(404).send("Veículo não encontrado");
      }
      await prisma.vehicles.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      resp.status(500).send("Ocorreu um erro ao deletar o veículo.");
    }
  });
}
