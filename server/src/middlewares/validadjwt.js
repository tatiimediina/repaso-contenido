import jwt from 'jsonwebtoken'

import { SECRET_KEY} from '../settings/environments' 
import { connection} from '../database/db'   

export const validarJWT = async(req, res, next) => {
    const token = req.cookie.authToken || req.session.token

    if(!token){
        return res.status(403).json({message: "Token no proporcionado"})
    }

    const decoded = jwt.verify(token, SECRET_KEY)

    const pool = await connection()

    const [user] = await pool.query('SELECT * FROM notes WHERE id = ?', [decoded.userID])

    if(!user){
        return res.status(401).json({message: 'Token inválido'})
    }
   
    req.user = user

    next()

}