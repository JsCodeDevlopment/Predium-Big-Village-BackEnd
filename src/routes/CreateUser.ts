import { People } from "@prisma/client";
import { prisma } from "../database/prismaClient";
import { FastifyInstance } from "fastify";

export async function createPerson(fastify: FastifyInstance) {
  // Rota para criar um usuário.
    fastify.post("/newpeople", async (req, resp) => {
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
  // Rota para deletar um usuário.
  fastify.delete("/people/:id",async (req, resp) => {
    try{
        const { id } = req.params as {id: string}
        const person = await prisma.people.findUnique({
            where: {
                id: id
            }
        })
        if (!person) {
            return resp.status(404).send('Usuário não encontrado')
        }
       await prisma.people.delete({
        where: {
            id: id
        }
       })
    }catch (error) {
        console.error(error);
        resp.status(500).send('Ocorreu um erro ao deletar o usuário.');
      }
  })
  
}
