import dotenv from "dotenv";
dotenv.config();

export const { MONGODB_URI, PORT, SECRET } = process.env;
