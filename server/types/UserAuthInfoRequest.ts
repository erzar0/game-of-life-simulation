import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface UserAuthInfoRequest extends Request {
  user?: string | JwtPayload;
}
