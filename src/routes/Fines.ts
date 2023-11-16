import { FastifyInstance } from "fastify";
import { prisma } from "../database/prismaClient";
import { Fines } from "@prisma/client";

export async function Fines(fastify: FastifyInstance) {
  // Rota para criar multas
  fastify.post("/fine/:number", async (req, resp) => {
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

      const { value, status, date } = req.body as Fines;

      if (
        status !== "Canceled" &&
        status !== "PaymentInProgress" &&
        status !== "Paid"
      ) {
        resp
          .status(404)
          .send(
            "Opções de status inválidas. Opções válidas são: Canceled, PaymentInProgress & Paid."
          );
      }

      const newFine = await prisma.fines.create({
        data: {
          value,
          status,
          apartmentId,
          date: new Date(date),
        },
      });
      return newFine;
    } catch (error) {
      resp.status(500).send("Deu merda!");
    }
  });
  // Rota para exibir todos as multas
  fastify.get("/fines", async (req, reply) => {
    try {
      const fines = await prisma.fines.findMany();

      return fines;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: "Erro ao obter as multas" });
    }
  });
  //Rota para deletar um único aviso
  fastify.delete("/fine/:id", async (req, resp) => {
    try {
      const { id } = req.params as { id: string };

      const fines = await prisma.fines.findUnique({
        where: {
          id: id,
        },
      });

      if (!fines) {
        return resp.status(404).send("Multa não encontrada");
      }

      await prisma.fines.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      resp.status(500).send("Ocorreu um erro ao deletar a multa.");
    }
  });

  //   fastify.get("/warnings/:id", async (req, resp) => {
  //     try {
  //       const { id } = req.params as { id: string };
  //       const warning = await prisma.warnings.findFirst({
  //         where: { id },
  //       });
  //       return warning;
  //     } catch (error) {
  //       fastify.log.error(error);
  //       resp.status(500).send({ error: "Erro ao obter o aviso" });
  //     }
  //   });
  //   // Rota para deletar um aviso.
  //   fastify.delete("/warnings/:id", async (req, resp) => {
  //     try {
  //       const { id } = req.params as { id: string };
  //       const warnings = await prisma.warnings.findUnique({
  //         where: {
  //           id: id,
  //         },
  //       });
  //       if (!warnings) {
  //         return resp.status(404).send("Aviso não encontrado");
  //       }
  //       await prisma.warnings.delete({
  //         where: {
  //           id: id,
  //         },
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       resp.status(500).send("Ocorreu um erro ao deletar o aviso.");
  //     }
  //   });
}
