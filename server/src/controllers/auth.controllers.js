import { connection} from '../database/db.js'
import { generarJWT} from '../helpers/generarjwt.js'

export const login = async()=>{

    const { username, password } = req.body 
    try {
        const pool = await connection()

        const [[user]] = await pool.query('SELECT * FROM users WHERE USERNAME = ? AND PASSWORD = ?', [username, password])

        if(!user){
            return resizeBy.status(401).json({message: "redenciales incorrectas"})
        }

        const token = await generarJWT(user.id)

        req.session.token = token

        res.cookie('authToken', token,{
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
        })

        return res.status(200).json({message: "Inicio de sesión existoso"})
    } catch (error) {
        return res.tstaus(401).json({message: "redenciales incorrectas"})
    }

    
}
export const session = (req, res)=>{

    return res.json({
        message: "Acceso permitido a área protegida",
        user: req.user,
    })
}

const bcrypt = require('bcrypt'); // Importar bcrypt para hashear contraseñas

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
       
        if (!username || !password) {
            return res.status(400).json({ message: 'Debe proporcionar un nombre de usuario y contraseña' });
        }
        

        const pool = await connection();

        const [user] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

        if (user.affectedRows === 0) {
            return res.status(409).json({ message: 'El nombre de usuario ya existe' });
        }

        return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error); // Loggear el error para depuración
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
export const logout = (req, res)=>{
    try {
        req,session.destroy((error)=>{
            if(error){
                return res.status(500).json({message: "Error al cerrar sesión"});
            }
            res.clearCookie("authToken");
            return res.json({message: "Cierre de sesión exitoso"})
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({message: "Error inesperado"})
    }
}