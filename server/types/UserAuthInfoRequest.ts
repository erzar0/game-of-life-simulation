import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface UserAuthInfoRequest extends Request {
  token?: string | JwtPayload;
}
