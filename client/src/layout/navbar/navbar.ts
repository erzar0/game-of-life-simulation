import { User } from "../../types/User";
import html from "../../utils/html";
import logout from "../../utils/logout";
import parseHtmlElement from "../../utils/parseHtmlElement";

function loadNavbar(user: User | null) {
  const navbarHtml = html`
    <nav id="navbar">
      <a href="/">Home</a>
      <a href="/about/">About</a>
      <div id="account"></div>
    </nav>
  `;

  const loginHtml = html`<a class="account-element" href="/login/">Login</a>`;
  const registerHtml = html`<a class="account-element" href="/register/"
    >Register</a
  >`;
  const logoutHtml = html`<a id="logout" class="account-element" href="/"
    >Logout</a
  >`;
  const loggedUserHtml = user?.username
    ? html`<p class="account-element" id="logged-user">
        Logged as ${user.username}
      </p>`
    : null;

  const body = document.querySelector("body");
  if (body) {
    body.prepend(parseHtmlElement(navbarHtml));
  }

  const account = document.getElementById("account");
  if (account) {
    if (!loggedUserHtml) {
      account.appendChild(parseHtmlElement(loginHtml));
      account.appendChild(parseHtmlElement(registerHtml));
    } else {
      const logoutBtn = parseHtmlElement(logoutHtml);
      logoutBtn.addEventListener("click", () => logout());
      account.appendChild(logoutBtn);
      account.appendChild(parseHtmlElement(loggedUserHtml));
    }
  }
}

export default loadNavbar;
