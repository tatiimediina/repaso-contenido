import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../settings/environments.js";
import { connection } from "../database/db.js";

export const validarJWT = async (req, res, next) => {
  // Verificar si el token existe en cookies o en la sesión
  const token = req.cookies.authToken || req.session.token;

  console.log(req.cookies);
  console.log(token);

  // Si no hay token, retornar un error
  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificar que el token sea un string
    if (typeof token !== "string") {
      return res.status(400).json({ message: "Token inválido" });
    }

    // Decodificar el token
    const decoded = jwt.verify(token, SECRET_KEY);

    const pool = await connection();

    // Buscar al usuario por su ID en la base de datos
    const [[user]] = await pool.query("SELECT * FROM users WHERE id=?", [
      decoded.userId,
    ]);

    if (!user) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // Agregar el usuario al request
    req.user = user;

    // Continuar con el siguiente middleware
    next();
  } catch (error) {
    // Manejar errores de decodificación o de la base de datos
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error inesperado en la verificación del token" });
  }
};
