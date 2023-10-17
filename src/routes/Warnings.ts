import { FastifyInstance } from "fastify";
import { prisma } from "../database/prismaClient";
import { Warnings } from "@prisma/client";

export async function Warnings(fastify: FastifyInstance) {
  // Rota para criar um aviso.
  fastify.post("/newwarning", async (req, resp) => {
    try {
      const { apartmentId, details, title } = req.body as Warnings;

      const newWarning = await prisma.warnings.create({
        data: {
          title,
          details,
          apartmentId
        },
      });
      return newWarning;
    } catch (error) {
      resp.status(500).send("Deu merda!");
    }
  });
  // Rota para criar um aviso.
  fastify.post("/warning/:number", async (req, resp) => {
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

      const { details, title } = req.body as Warnings;

      const newWarning = await prisma.warnings.create({
        data: {
          title,
          details,
          apartmentId
        },
      });
      return newWarning;
    } catch (error) {
      resp.status(500).send("Deu merda!");
    }
  });
  // Rota para exibir todos os avisos
  fastify.get("/warnings", async (request, reply) => {
    try {
      const warnings = await prisma.warnings.findMany();

      return warnings;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: "Erro ao obter os avisos" });
    }
  });
  //Rota para exibir um único aviso
  fastify.get("/warnings/:id", async (req, resp) => {
    try {
      const { id } = req.params as { id: string };
      const warning = await prisma.warnings.findFirst({
        where: { id },
      });
      return warning;
    } catch (error) {
      fastify.log.error(error);
      resp.status(500).send({ error: "Erro ao obter o aviso" });
    }
  });
  // Rota para deletar um aviso.
  fastify.delete("/warnings/:id", async (req, resp) => {
    try {
      const { id } = req.params as { id: string };
      const warnings = await prisma.warnings.findUnique({
        where: {
          id: id,
        },
      });
      if (!warnings) {
        return resp.status(404).send("Aviso não encontrado");
      }
      await prisma.warnings.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      resp.status(500).send("Ocorreu um erro ao deletar o aviso.");
    }
  });
}
