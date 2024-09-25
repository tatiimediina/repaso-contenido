import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { PORT, SECRET_KEY} from './src/settings/environments.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'


const app = express()

app.use(cors({
    origin: [
        'http://localhost:4000',
        'http://localhost:5173'

    ], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(session(
    {
        secret: SESSION_KEY, 
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}

    }
))

// Routes
app.use()



app.listen(PORT, () => {
   
    console.log(`Server on port ${PORT}`)
})