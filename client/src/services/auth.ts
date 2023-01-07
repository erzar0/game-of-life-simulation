import { User } from "../types/User";
import decodeJWT from "../utils/decodeJWT";

const baseUrl = "http://localhost:3001/user";
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
  const token = window.localStorage.getItem("tokenJWT");
  if (token) {
    try {
      const res = await fetch(baseUrl + "/validate-token", {
        headers: { authorization: "Bearer " + token },
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
