import parseHtmlElement from "../../utils/parseHtmlElement";
import html from "../../utils/html";

function loadFooter() {
  const footerHtml = html`
    <footer ><span >&copy;</span></footer>
  `;

  const body = document.querySelector("body");
  if (body) {
    body.appendChild(parseHtmlElement(footerHtml));
  }
}

export default loadFooter;
