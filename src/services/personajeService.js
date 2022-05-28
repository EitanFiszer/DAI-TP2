import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'
import dbHelper from '../../Helper.js'

const personajeTabla = process.env.DB_TABLA_PERSONAJE;
const peliculaTabla = process.env.DB_TABLA_PELICULA;
const peliculaXpersonajeTabla = process.env.DB_TABLA_PELICULAPERSONAJE;

export class PersonajeService {

    getPersonaje = async (nombre,edad,id_movie,peso) => {
        console.log('This is a function on the service');
        let response;
        let solicitud=`SELECT distinct Nombre, Imagen, Id from ${personajeTabla} c, ${peliculaXpersonajeTabla} pp WHERE c.Id=pp.Id_personaje`;
        if(nombre){
            solicitud+=` and Nombre=@Nombre`;              
        }if(edad){
            solicitud+=` and Edad=@Edad`;
        }if(id_movie){
            solicitud+=` and pp.Id_pelicula=@Id `; 
        }if(peso){
            solicitud+=` and Peso=@Peso `;
        }

        response=await dbHelper(undefined, {nombre,edad,id_movie,peso}, solicitud)

        return response.recordset;
    }

    createPersonaje = async (personaje) => {
        console.log('This is a function on the service');
        let response;
        let query=`INSERT INTO ${personajeTabla}(Nombre, Imagen, Edad, Peso, Historia, Nacimiento) VALUES (@Nombre, @Imagen, @Edad, @Peso, @Historia, @Nacimiento)`;
        response=await dbHelper(undefined,personaje,query)
        console.log(response)

        return response.recordset;
    }

    updatePersonajeById = async (id, personaje) => {
        console.log('This is a function on the service');
        let response;
        let query=`UPDATE ${personajeTabla} SET Nombre = @Nombre, Imagen = @Imagen, Edad = @Edad, Peso = @Peso, Historia = @Historia, Nacimiento = @Nacimiento WHERE Id = @Id`;
        response=await dbHelper(id,personaje,query)
        console.log(response)
        console.log(personaje.id)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {
        console.log('This is a function on the service');
        let response;
        let query=`DELETE FROM ${personajeTabla} WHERE Id = @Id`
        response=await dbHelper(id,undefined,query)
        console.log(response)

        return response.recordset;
    }

    getCharacterById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`SELECT m.* from ${peliculaXpersonajeTabla} pp, ${peliculaTabla} m where pp.Id_personaje=@Id and pp.Id_pelicula=m.Id`);
        const personaje = await pool.request()
            .input('Id',sql.Int, id)
            .query(`SELECT * from ${personajeTabla} WHERE Id=@Id`);

            personaje.recordset[0].movies=response.recordset;

        console.log(response)

        return personaje.recordset[0];
        }
}