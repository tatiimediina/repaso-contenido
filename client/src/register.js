export const Register = async ($app) => {
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
    "min-h-screen"
  );

  const $username = document.createElement("input");
  $username.setAttribute("type", "text");
  $username.setAttribute("name", "username");
  $username.setAttribute("placeholder", "Username");

  const $password = document.createElement("input");
  $password.setAttribute("type", "password");
  $password.setAttribute("name", "password");
  $password.setAttribute("placeholder", "Password");

  const $button = document.createElement("button");
  $button.setAttribute("type", "submit");
  $button.textContent = "Register"; // Cambié "Login" por "Register"
  $button.classList.add("rounded-lg", "bg-slate-800", "text-white", "p-2");

  const $span = document.createElement("span");
  $span.textContent = "Ya tienes cuenta?";
  $span.classList.add("text-slate-800");

  const $a = document.createElement("a");
  $a.textContent = "Inicia sesión";
  $a.setAttribute("href", "/login"); // Cambié "/register" por "/login"
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

    const username = $username.value.trim();
    const password = $password.value.trim();

    // Validación básica de campos vacíos
    if (!username || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        credentials: "include", // Asegúrate de que el backend permita las credenciales
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Verificar respuesta
      if (response.ok) {
        console.log("Registro exitoso");
        window.location.href = "/login"; // Asegúrate que este sea el flujo deseado
      } else {
        alert("Error en el registro.");
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
    }
  });
};
