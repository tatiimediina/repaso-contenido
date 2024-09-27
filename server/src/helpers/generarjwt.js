import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../settings/environments.js";

export const generarJWT = (userID) => {
  return new Promise((resolve, reject) => {
    const payload = { userID };
    jwt.sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: "5h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
