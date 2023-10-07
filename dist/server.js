"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const fastify_1 = require("fastify");
const CreateUser_1 = require("./routes/CreateUser");
const User_1 = require("./routes/User");
const Login_1 = require("./routes/Login");
exports.server = (0, fastify_1.fastify)({ logger: true });
exports.server.register(CreateUser_1.createPerson);
exports.server.register(User_1.user);
exports.server.register(Login_1.login);
exports.server.listen({
    port: 3333
}).then((err) => {
    console.log('running on http://localhost:3333');
});
exports.server.get('/', () => {
    return "Created!";
});
// rota para criar algo ex.: POST localhost:3333/user
// rota para deletar algo ex.: DELETE localhost:3333/user/del
// rota para obter algo ex.: GET localhost:3333/user
// rota para atualizar algo ex.: PUT localhost:3333/user
