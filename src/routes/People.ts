import { People } from "@prisma/client";
import { prisma } from "../database/prismaClient";
import { FastifyInstance } from "fastify";

export async function People(fastify: FastifyInstance) {
  // Rota para criar um usuário.
    fastify.post("/newpeople", async (req, resp) => {
    try {
      const { name, phoneNumber, email, cpf, rg} = req.body as People;

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
  fastify.delete("/person/:id",async (req, resp) => {
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
  // Rota para exibir todos as pessoas
 fastify.get('/person', async (request, reply) => {
  try {
    const user = await prisma.people.findMany();

    return user;
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({ error: 'Erro ao obter os apartamentos' });
  }
});
}
