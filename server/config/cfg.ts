import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
import { resolve } from "path";
dotenv.config({
  path: resolve(__dirname, "../.dev.env"),
});

export const { MONGODB_URI, PORT } = process.env;
export const SECRET = process.env.SECRET as Secret;
