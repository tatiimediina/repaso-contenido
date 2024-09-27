import { connection } from "../database/db.js";
import { generarJWT } from "../helpers/generarjwt.js";

// Función de inicio de sesión
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await connection();

    // Consulta a la base de datos
    const [[user]] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    console.log(user);

    // Validación de credenciales
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Generación de token
    const token = generarJWT(user.id);

    // Guardado del token en la sesión y cookie
    req.session.token = token;
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // Cambia a true en producción
      maxAge: 3600000, // 1 hora
    });

    return res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    return res.status(500).json({ message: "Error inesperado" });
  }
};

// Función para áreas protegidas
export const session = (req, res) => {
  return res.json({
    message: "Acceso permitido a área protegida",
    user: req.user,
  });
};

// Función de registro de usuarios
export const register = async (req, res) => {
  const { username, password } = req.body;

  // Validación de campos obligatorios
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const pool = await connection();

    // Inserción de nuevo usuario
    const [result] = await pool.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, password]
    );

    // Verificación de inserción
    if (result.affectedRows === 0) {
      return res
        .status(401)
        .json({ message: "El nombre de usuario ya existe" });
    }

    return res.json({ message: "Registro exitoso" });
  } catch (error) {
    return res.status(500).json({ message: "Error inesperado" });
  }
};

// Función de cierre de sesión
export const logout = (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      res.clearCookie("authToken");
      return res.json({ message: "Cierre de sesión exitoso" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error inesperado" });
  }
};
