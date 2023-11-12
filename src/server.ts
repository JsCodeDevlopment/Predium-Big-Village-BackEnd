import { fastify } from "fastify";
import { People } from "./routes/People";
import { user } from "./routes/User";
import { login } from "./routes/Login";
import { apartaments } from "./routes/Apartaments";
import cors, { FastifyCorsOptions } from "@fastify/cors";
import { pet } from "./routes/Pet";
import { Residents } from "./routes/Residents";
import { Warnings } from "./routes/Warnings";
import { Vehicles } from "./routes/Vehicles";
import { Fines } from "./routes/Fines";

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
server.register(Vehicles);
server.register(Fines);

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
    POST/ /login: Verifica o login para executar o login,

    === APARTMENT ROUTES ===
    POST/ /newapartament: Criar novo apartamento,
    POST/ /newresident: Criar novo morador,
    GET/ /apartments: Exibe todos os apartamentos,
    GET/ /apartments/:id: Exibe o apartamento pelo id,

    === PEOPLE ROUTES ===
    POST/ /newpeople: Criar nova pessoa,
    POST/ /newuser: Criar Novo Usuário,
    GET/ /person: Exibe as pessoas,
    GET/ /users: Exibe os usuários,
    DELETE/ /person/:id: Deleta pessoa pelo id,
    
    === PET ROUTES ===
    POST/ /newpet: Cria um pet,
    GET/ /pets: Exibe todos os pets,
    DELETE/ /pets/:id: Deleta um único pet,

    === WARNING ROUTES ===
    POST/ /newwarning: Cria um novo aviso,
    POST/ /warning/:number: Cria um novo aviso baseado no número do AP,
    GET/ /warnings: Exibe todos os avisos,
    GET/ /warnings/:id: Exibe um único aviso,
    DELETE/ /warnings/:id: Exclui um aviso,

    === VEICLES ROUTES ===
    POST/ /vehicles/:id: Cria um novo veículo,
    GET/ /vehicles/: Exibe todos os veículo,
    DELETE/ /vehicles/:id: Deleta um veículo,
  }

  Created by: Jonatas S.
  Github: https://github.com/JsCodeDevlopment
  Repository: https://github.com/JsCodeDevlopment/Predium-Big-Village-BackEnd
  `;
});