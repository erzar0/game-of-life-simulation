import jwt, { Secret } from "jsonwebtoken";
import { SECRET } from "../config/cfg";
import User from "../types/User";

const signJWT = (
  user: User,
  callback: (error: Error | null, token: string | null) => void
): void => {
  const timeStamp = new Date().getTime();
  const expirationTimeSeconds = 86400;

  try {
    jwt.sign(
      { username: user.username },
      SECRET as Secret,
      { expiresIn: expirationTimeSeconds },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    console.error((error as Error).message, error);
    callback(error as Error, null);
  }
};

export default signJWT;
