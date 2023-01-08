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

const gridConfigService = { getUserConfigs };

export default gridConfigService;
