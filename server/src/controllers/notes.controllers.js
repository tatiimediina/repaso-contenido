import { connection } from '../database/db.js'

export const getAllNotes = async(_req, res)=>{

   try {
    const pool = await connection()

    const [notes] = pool.query('SELECT * FROM notes')

    return res.status(200).json(notes)

    
   } catch (error) {
     console.log(error)
     return res.status(500).json('Error al obtener las notas')
   }

}
export const validarNote = (note, subject)=>{
    if(typeof note !== 'Number' || note.trim() === '' ){
        return {valid: false, message: "La nota debe ser un numero y no puede estar vacio"}
    }
    if(typeof subject !== 'string' || subject.trim() === '' || subject.length > 50 ){
        return {valid: false, message: "La asignatura debe ser una cadena de texto y debe tener entre 1 y 50 caracteres"}
    }
}

export const createNote = async(req, res)=>{
    const { note, subject } = req.body


    const validation = validarNote(note, subject)

    if(!validation.valid){
        return res.status(400).json({message: validation.message})
    }
    try {
        
        
    } catch (error) {
        
    }
}