import express, {
  Express,
  Request,
  RequestParamHandler,
  Response,
} from "express";
import jwt, { Secret } from "jsonwebtoken";
import mongoose from "mongoose";
import { MONGODB_URI, PORT, SECRET } from "./config/cfg";
import { isAuth } from "./middleware/isAuth";
import { UserAuthInfoRequest } from "./types/UserAuthInfoRequest";
import userRouter from "./routes/user";
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

const books = [
  {
    author: "Chinua Achebe",
    country: "Nigeria",
    language: "English",
    pages: 209,
    title: "Things Fall Apart",
    year: 1958,
  },
  {
    author: "Hans Christian Andersen",
    country: "Denmark",
    language: "Danish",
    pages: 784,
    title: "Fairy tales",
    year: 1836,
  },
  {
    author: "Dante Alighieri",
    country: "Italy",
    language: "Italian",
    pages: 928,
    title: "The Divine Comedy",
    year: 1315,
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
app.get("/", (req: Request, res: Response) => {
  res.send("Hell");
});

app.use(express.json());
app.use("/user", userRouter);

// app.post("/login", (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   const user = users.find((u) => {
//     return u.username === username && u.password === password;
//   });
//   console.log(user);
//   if (user) {
//     const accessToken = jwt.sign(
//       { username: user.username },
//       SECRET as Secret,
//       { expiresIn: "30d" }
//     );

//     return res.json(accessToken);
//   }
//   return res.send("Incorrect credentials");
// });

// app.post("/is-auth", isAuth, (req: Request, res: Response) => {
//   res.json(books);
// });

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
