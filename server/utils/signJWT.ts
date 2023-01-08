import jwt, { Secret } from "jsonwebtoken";
import { SECRET } from "../config/cfg";
import User from "../types/User";
import { JwtPayload } from "jsonwebtoken";

const signJWT = (
  user: User,
  callback: (error: Error | null, token: string | null) => void
): void => {
  const expiresIn = "1d";

  try {
    jwt.sign(
      { username: user.username, id: user.id },
      SECRET as Secret,
      { expiresIn },
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
