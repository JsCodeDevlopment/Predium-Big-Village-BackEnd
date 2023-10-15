import { fastify } from "fastify";
import { People } from "./routes/People";
import { user } from "./routes/User";
import { login } from "./routes/Login";
import { apartaments } from "./routes/Apartaments";
import cors, { FastifyCorsOptions } from "@fastify/cors";
import { pet } from "./routes/Pet";
import { Residents } from "./routes/Residents";

const whiteList = [
  "http://localhost:5173",
  "https://predium-big-village.vercel.app"
];

const corsOptions: FastifyCorsOptions = {
  origin: (origin, callback) => {
    if ((origin && whiteList.includes(origin)) ?? !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const server = fastify({ logger: true });

server.register(cors, corsOptions)

server.register(People);
server.register(apartaments);
server.register(pet);
server.register(user);
server.register(login);
server.register(Residents);

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("running on http://localhost:3333");
  });

server.get("/", () => {
  return `Bem Vindo a Predium Big village API

  Rotas ativas {
    /newapartament: Criar novo apartamento,
    /login: Verifica o login para executar o login,
    /newuser: Criar Novo Usuário,
    /users: Exibe os usuários,
    /newpeople: Criar nova pessoa,
    /person/:id: Deleta pessoa pelo id,
    /person: Exibe os usuários,
    /apartments/:id: Exibe o apartamento pelo id,
    /apartments: Exibe todos os apartamentos,
    /pets: Exibe todos os pets,
    /pets/:id: Exibe um único pet
  }

  Created by: Jonatas S.
  Github: https://github.com/JsCodeDevlopment
  Repository: https://github.com/JsCodeDevlopment/Predium-Big-Village-BackEnd
  `;
});