import { Router } from 'express'
import { login, logout, register, session } from '../controllers/auth.controllers'
import { validarJWT } from '../middlewares/validadjwt'
const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.post('/register', register)
authRoutes.get('/session', validarJWT, session)