import "./navbar.css";
import parseHtmlString from "../../utils/basicUtils";

async function loadNavbar() {
  let navbarText;
  try {
    const response = await fetch("html/layout/navbar.html");
    navbarText = await response.text();
  } catch (e) {
    console.error("Cannot load navbar");
  }

  const body = document.querySelector("body");
  console.log(body);
  if (body && navbarText) {
    body.prepend(parseHtmlString(navbarText));
  }
}

export { loadNavbar };
