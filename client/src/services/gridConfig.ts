import { GridConfig } from "../types/Grid";
import getBearer from "../utils/getBearer";
const baseUrl = "http://localhost:3001/grid-config";

const getUserConfigs = async () => {
  const bearer = getBearer();
  if (bearer) {
    try {
      const res = await fetch(baseUrl + "/get/user", {
        headers: { authorization: bearer },
      });
      if (res.status === 200) {
        return res.json();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

const addUserConfig = async (gridConfig: GridConfig) => {
  const authorization = getBearer();
  if (authorization) {
    try {
      const res = await fetch(baseUrl + "/", {
        method: "POST",
        headers: { authorization, "Content-Type": "application/json" },
        body: JSON.stringify(gridConfig),
      });
      console.log(res);
      if (res.status === 200) {
        return await res.json();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

const gridConfigService = { getUserConfigs, addUserConfig };

export default gridConfigService;
