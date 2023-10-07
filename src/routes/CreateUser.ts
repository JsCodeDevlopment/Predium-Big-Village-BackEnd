import { People } from "@prisma/client";
import { prisma } from "../database/prismaClient";
import { FastifyInstance } from "fastify";

export async function createPerson(fastify: FastifyInstance) {
  fastify.post("/people", async (req, resp) => {
    try {
      const { name, phoneNumber, email, cpf, rg } = req.body as People;

      const newPerson = await prisma.people.create({
        data: {
          name,
          phoneNumber,
          email,
          cpf,
          rg,
        },
      });
      return newPerson;
    } catch (error) {
      resp.status(500).send("Deu merda!");
    }
  });

}
