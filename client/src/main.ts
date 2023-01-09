/* eslint-disable indent */
import loadLayout from "./layout/loadLayout";
import home from "./pages/home/home";
import login from "./pages/login/login";
import register from "./pages/register/register";
import gridConfigService from "./services/gridConfig";

const logout = () => {
  window.localStorage.clear();
  window.location.replace(window.location.origin);
};

const validateToken = () => {
  let isTokenValid = false;
  const currentTime = new Date().getTime();
  const tokenJWTExpirationDate = window.localStorage.getItem(
    "tokenJWTExpirationDate"
  );
  if (
    tokenJWTExpirationDate &&
    parseInt(tokenJWTExpirationDate) > currentTime
  ) {
    isTokenValid = true;
  }

  if (tokenJWTExpirationDate !== null && !isTokenValid) {
    logout();
  }
};

const getCurrentUser = () => {
  const username = window.localStorage.getItem("username");
  if (username) {
    return { username };
  }
  return null;
};

(async () => {
  validateToken();
  const currentUser = getCurrentUser();
  loadLayout(currentUser);
  const userGridConfigs = await gridConfigService.getUserConfigs();

  switch (window.location.pathname) {
    case "/":
      home(userGridConfigs, currentUser);
      break;
    case "/login/":
      login();
      break;
    case "/register/":
      register();
      break;
    case "/logout/":
      logout();
      break;
    case "/about/":
      break;
    default:
      break;
  }
})();
