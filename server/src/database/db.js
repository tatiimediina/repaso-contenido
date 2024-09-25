import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PORT, DB_USER } from "../settings/environments.js";

const connection = async () => {
  try {
    const pool = createPool({
      host: DB_HOST,
      user: DB_USER,
      database: DB_NAME,
      port: DB_PORT
      
    });
    console.log('conectado a la base de datos')
    return pool;
  } catch (error) {
    console.log('error al intentar conectar con la base de datos')
  }
};
export { connection };
