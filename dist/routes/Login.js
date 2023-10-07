"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const prismaClient_1 = require("../database/prismaClient");
async function login(fastify) {
    // Rota para criar um usuário.
    fastify.post("/login", async (req, resp) => {
        try {
            const { email, password } = req.body;
            const person = await prismaClient_1.prisma.people.findFirst({
                where: {
                    email
                },
                include: {
                    User: true
                }
            });
            if (!person) {
                resp.status(404).send("Email ou senha inválido");
            }
            if (person?.User?.password !== password) {
                resp.status(404).send("Email ou senha inválido");
            }
            return {
                login: true
            };
        }
        catch (error) {
            resp.status(500).send("Deu merda!");
        }
    });
}
exports.login = login;
