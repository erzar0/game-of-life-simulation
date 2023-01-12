import { User } from "../types/User";
import decodeJWT from "../utils/decodeJWT";
import getBearer from "../utils/getBearer";

const baseUrl = "http://localhost:30498/user";
interface Credentials {
  username: string;
  password: string;
}

interface RegisterCredentials extends Credentials {
  confirm: string;
}

const login = async (credentials: Credentials) => {
  try {
    const res = await fetch(baseUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (res.status === 200) {
      const data = await res.json();
      const token = decodeJWT(data.token);
      return token;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const register = async (
  registerCredentials: RegisterCredentials
): Promise<User | null> => {
  const { username, password, confirm } = registerCredentials;
  if (password !== confirm) {
    return null;
  }
  try {
    const res = await fetch(baseUrl + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (res.status === 201) {
      const data = await res.json();
      return data.user;
    }
    return null;
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
  return null;
};

const isCurrentTokenValid = async () => {
  const bearer = getBearer();
  if (bearer) {
    try {
      const res = await fetch(baseUrl + "/validate-token", {
        headers: { authorization: bearer },
      });

      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  return false;
};

const authService = { login, register, isCurrentTokenValid };
export default authService;
