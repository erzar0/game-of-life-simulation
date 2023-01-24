import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
import { resolve } from "path";

const path = resolve(__dirname, "../../.dev.env");
dotenv.config({ path });

export const { PORT } = process.env || 30498;
export const { MONGODB_URI } = process.env;
export const SECRET = process.env.SECRET as Secret;
