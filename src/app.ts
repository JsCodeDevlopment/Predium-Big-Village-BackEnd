import fastify from "fastify";
import { People } from "./routes/People";
import { apartaments } from "./routes/Apartaments";
import { pet } from "./routes/Pet";
import { user } from "./routes/User";
import { login } from "./routes/Login";
import { Residents } from "./routes/Residents";
import { Warnings } from "./routes/Warnings";
import { Vehicles } from "./routes/Vehicles";
import { Fines } from "./routes/Fines";
import cors from "@fastify/cors";
import { corsOptions } from "./middleware/Cors";

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