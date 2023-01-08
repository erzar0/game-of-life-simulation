const getBearer = () => {
  const token = window.localStorage.getItem("tokenJWT");
  if (token) {
    return "Bearer " + token;
  }
  return null;
};

export default getBearer;
