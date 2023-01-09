import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./config/cfg";
import { isAuth } from "./middleware/isAuth";
import userRouter from "./routes/user";
import gridConfigRouter from "./routes/gridConfig";
import cors from "cors";
mongoose.set("strictQuery", false);

const conn = mongoose
  .connect(MONGODB_URI! as string)
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.log("Connection to database failed");
    console.log(error);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/grid-config", gridConfigRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Health check");
});

//
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
