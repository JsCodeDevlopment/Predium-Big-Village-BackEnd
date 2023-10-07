"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPerson = void 0;
const prismaClient_1 = require("../database/prismaClient");
async function createPerson(fastify) {
    // Rota para criar um usuário.
    fastify.post("/people", async (req, resp) => {
        try {
            const { name, phoneNumber, email, cpf, rg } = req.body;
            const newPerson = await prismaClient_1.prisma.people.create({
                data: {
                    name,
                    phoneNumber,
                    email,
                    cpf,
                    rg,
                },
            });
            return newPerson;
        }
        catch (error) {
            resp.status(500).send("Deu merda!");
        }
    });
    // Rota para deletar um usuário.
    fastify.delete("/people/:id", async (req, resp) => {
        try {
            const { id } = req.params;
            const person = await prismaClient_1.prisma.people.findUnique({
                where: {
                    id: id
                }
            });
            if (!person) {
                return resp.status(404).send('Usuário não encontrado');
            }
            await prismaClient_1.prisma.people.delete({
                where: {
                    id: id
                }
            });
        }
        catch (error) {
            console.error(error);
            resp.status(500).send('Ocorreu um erro ao deletar o usuário.');
        }
    });
}
exports.createPerson = createPerson;
