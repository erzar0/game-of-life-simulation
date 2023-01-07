import authService from "../../services/auth";

async function register() {
  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const confirmInput = document.getElementById("confirm") as HTMLInputElement;
  const submitButton = document.getElementById("submit") as HTMLButtonElement;

  submitButton?.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirm = confirmInput.value;
    try {
      const newUser = await authService.register({
        username,
        password,
        confirm,
      });

      if (newUser) {
        window.location.replace(window.location.origin);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  });
}
export default register;
