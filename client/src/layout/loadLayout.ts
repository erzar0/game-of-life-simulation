import { User } from "../types/User";
import loadFooter from "./footer/footer";
import loadNavbar from "./navbar/navbar";

function loadLayout(user: User | null) {
  loadNavbar(user);
  loadFooter();
}

export default loadLayout;
