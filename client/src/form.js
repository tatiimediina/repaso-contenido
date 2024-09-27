export const Login = async ($app) => {
  const $form = document.createElement("form");
  $form.classList.add(
    "login",
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "gap-4",
    "p-4",
    "rounded",
    "bg-slate-400",
    "min-h-screen"
  );

  const $username = document.createElement("input");
  $username.setAttribute("type", "text");
  $username.setAttribute("name", "username");
  $username.setAttribute("placeholder", "username");

  const $password = document.createElement("input");
  $password.setAttribute("type", "password");
  $password.setAttribute("name", "password");
  $password.setAttribute("placeholder", "password");

  const $button = document.createElement("button");
  $button.setAttribute("type", "submit");
  $button.textContent = "Login";
  $button.classList.add("rounded-lg", "bg-slate-800", "text-white", "p-2");

  const $span = document.createElement("span");
  $span.textContent = "No tienes cuenta?";
  $span.classList.add("text-slate-800");

  const $a = document.createElement("a");
  $a.textContent = "Registrate";
  $a.setAttribute("href", "/register");
  $a.classList.add("text-slate-800");

  $span.appendChild($a);
  $form.appendChild($username);
  $form.appendChild($password);
  $form.appendChild($button);
  $form.appendChild($span);
  $app.appendChild($form);

  // Manejador de evento submit
  $form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = $username.value;
    const password = $password.value;

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        credentials: "include", // Asegúrate de que el backend permita las credenciales
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Verificar respuesta
      if (response.ok) {
        console.log("Inicio de sesión exitoso");
        window.location.href = "/home";
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión:", error);
    }
  });
};
