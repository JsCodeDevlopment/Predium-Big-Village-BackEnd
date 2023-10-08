import { fastify } from "fastify";
import { createPerson } from "./routes/CreateUser";
import { user } from "./routes/User";
import { login } from "./routes/Login";
import { apartaments } from "./routes/Apartaments";

export const server = fastify({logger: true})

server.register(createPerson)
server.register(apartaments)
server.register(user)
server.register(login)

server.listen({
    port: 3333
}).then((err)=>{
    console.log('running on http://localhost:3333')
})

server.get('/', ()=>{
    return "Created!"
})

// rota para criar algo ex.: POST localhost:3333/user
// rota para deletar algo ex.: DELETE localhost:3333/user/del
// rota para obter algo ex.: GET localhost:3333/user
// rota para atualizar algo ex.: PUT localhost:3333/user