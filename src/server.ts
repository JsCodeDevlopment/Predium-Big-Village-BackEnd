import { fastify } from "fastify";
import { People } from "./routes/People";
import { user } from "./routes/User";
import { login } from "./routes/Login";
import { apartaments } from "./routes/Apartaments";
import cors, { FastifyCorsOptions } from "@fastify/cors";
import { pet } from "./routes/Pet";
import { Residents } from "./routes/Residents";
import { Warnings } from "./routes/Warnings";

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
server.register(Warnings);

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
    POST/ /newapartament: Criar novo apartamento,
    POST/ /login: Verifica o login para executar o login,
    POST/ /newuser: Criar Novo Usuário,
    GET/ /users: Exibe os usuários,
    POST/ /newpeople: Criar nova pessoa,
    DELETE/ /person/:id: Deleta pessoa pelo id,
    GET/ /person: Exibe os usuários,
    GET/ /apartments/:id: Exibe o apartamento pelo id,
    GET/ /apartments: Exibe todos os apartamentos,
    GET/ /pets: Exibe todos os pets,
    GET/ /pets/:id: Exibe um único pet,
    POST/ /newwarning: Cria um novo aviso,
    POST/ /warning/:number: Cria um novo aviso baseado no número do AP,
    GET/ /warnings: Exibe todos os avisos,
    GET/ /warnings/:id: Exibe um único aviso,
    DELETE/ /warnings/:id: Exclui um aviso,
  }

  Created by: Jonatas S.
  Github: https://github.com/JsCodeDevlopment
  Repository: https://github.com/JsCodeDevlopment/Predium-Big-Village-BackEnd
  `;
});