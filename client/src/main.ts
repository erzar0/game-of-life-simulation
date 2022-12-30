import loadLayout from "./layout/loadLayout";
import home from "./pages/home/home";

(() => {
  loadLayout();
  switch (window.location.pathname) {
    case "/":
      home();
      break;
    case "/about/":
      console.log("aaaaa");
      break;
    default:
      break;
  }
})();
