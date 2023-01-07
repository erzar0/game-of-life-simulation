import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/cfg";
import { UserAuthInfoRequest } from "../types/UserAuthInfoRequest";

const isAuth = (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(" ")[1];

    jwt.verify(token, SECRET, (error, user) => {
      if (error) {
        return res.status(403).end();
      } else if (user) {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
//
export { isAuth };
