import parseHtmlElement from "../../utils/parseHtmlElement";
import html from "../../utils/html";

function loadFooter() {
  const footerHtml = html` <footer>some footer</footer> `;

  const body = document.querySelector("body");
  if (body) {
    body.appendChild(parseHtmlElement(footerHtml));
  }
}

export default loadFooter;