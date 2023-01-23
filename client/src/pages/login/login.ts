import authService from "../../services/auth";

async function login() {
  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const submitButton = document.getElementById("submit") as HTMLButtonElement;
  const errorMessage = document.getElementById("error-message") as HTMLButtonElement
  let timeout: number| undefined 

  submitButton?.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    try {
      const token = await authService.login({ username, password });

      const payload = token?.payload;
      if (payload?.username && token?.raw) {
        window.localStorage.setItem("username", payload.username);
        window.localStorage.setItem("tokenJWT", token.raw);
        window.localStorage.setItem(
          "tokenJWTExpirationDate",
          String(payload.exp * 1000)
        );
      }
      if (payload?.username) {
        window.location.replace(window.location.origin);
      } else {
        if(errorMessage)
        {
          clearTimeout(timeout)
          errorMessage.innerText = "Invalid login credentials!"
          timeout = setTimeout(() => {
            errorMessage.innerText = ""
          }, 5000)
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}
export default login;
