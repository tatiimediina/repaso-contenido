import "./style.css";
import { Login } from "./form.js";
import { Register } from "./register.js";
import { Home } from "./home.js";

const pathname = window.location.pathname;
const $app = document.querySelector("#app");

// Cargar el componente según la ruta
if (pathname === "/login") {
  Login($app);
} else if (pathname === "/register") {
  Register($app);
} else if (pathname === "/home") {
  Home($app);
}

// Verificar la sesión solo en rutas protegidas
if (pathname === "/home") {
  (async () => {
    try {
      const response = await fetch("http://localhost:4000/session", {
        method: "GET",
        credentials: "include", // Para enviar cookies/sesión
      });

      console.log({ response });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Sesión válida, procesar la data del usuario
      } else {
        // Redirigir al usuario a la página de inicio de sesión si la sesión no es válida
        window.location.href = "/login";
        console.log("aca es el error");
      }
    } catch (error) {
      console.error("Error al verificar la sesión:", error);
      window.location.href = "/login"; // Redirigir en caso de error en la solicitud
    }
  })();
}
