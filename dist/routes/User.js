"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const prismaClient_1 = require("../database/prismaClient");
async function user(fastify) {
    // Rota para criar um usuário.
    fastify.post("/user", async (req, resp) => {
        try {
            const { password, personId, type } = req.body;
            const newUser = await prismaClient_1.prisma.users.create({
                data: { password, personId, type },
            });
            return newUser;
        }
        catch (error) {
            resp.status(500).send("Deu merda!");
        }
    });
}
exports.user = user;
