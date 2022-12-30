import html from "../../utils/html";
import parseHtmlElement from "../../utils/parseHtmlElement";

function loadNavbar() {
  const navbarHtml = html`
    <nav>
      <a href="/">Home</a>
      <a href="/about/">About</a>
    </nav>
  `;

  const body = document.querySelector("body");
  if (body) {
    body.prepend(parseHtmlElement(navbarHtml));
  }
}

export default loadNavbar;
