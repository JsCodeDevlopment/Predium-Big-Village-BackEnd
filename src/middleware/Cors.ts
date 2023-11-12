import { FastifyCorsOptions } from "@fastify/cors";

const whiteList = [
    "http://localhost:5173",
    "https://predium-big-village.vercel.app"
  ];

export const corsOptions: FastifyCorsOptions = {
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