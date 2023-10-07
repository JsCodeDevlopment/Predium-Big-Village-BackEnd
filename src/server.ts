import { fastify } from "fastify";

export const server = fastify()

server.listen({
    port: 3333
}).then(()=>{
    console.log('running on http://localhost:3333')
})

server.get('/', ()=>{
    return "Created!"
})

// rota para criar algo ex.: POST localhost:3333/user
// rota para deletar algo ex.: DELETE localhost:3333/user/del
// rota para obter algo ex.: GET localhost:3333/user
// rota para atualizar algo ex.: PUT localhost:3333/user