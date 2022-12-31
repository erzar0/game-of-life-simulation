import express, { Express, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import mongoose from "mongoose";
import { MONGODB_URI, PORT, SECRET } from "./config/cfg";
mongoose.set("strictQuery", false);

const users = [
  {
    username: "john",
    password: "password123admin",
    role: "admin",
  },
  {
    username: "anna",
    password: "password123member",
    role: "member",
  },
];

const conn = mongoose
  .connect(MONGODB_URI! as string)
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.log("Connection to database failed");
    console.log(error);
  });

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("HELL");
});

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  console.log(user);
  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      SECRET as Secret
    );
    console.log(accessToken);
    return res.json(accessToken);
  }
  return res.send("Incorrect credentials");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
