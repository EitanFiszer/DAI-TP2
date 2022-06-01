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
        let where=false
        let response;

        let query=`SELECT distinct Nombre, Imagen, Id from ${personajeTabla} c `;
        let query1=''

        if(nombre){
            where=true;
            query1+=`Nombre=@Nombre`;   

        }if(edad){
            if(where){
                query1+=` and Edad=@Edad`;
            }else{
                where=true
                query1+=` Edad=@Edad `
            }

        }if(peso){
            if(where){
            query1+=` and Peso=@Peso `;
            }else{
            where=true
            query1+=` Peso=@Peso ` 
            }
        }if(id_movie && (nombre || edad || peso)){
            query1= `, ${peliculaXpersonajeTabla} pp where c.Id=pp.Id_personaje and `+query1
            query1+=` and pp.Id_pelicula=@Id_movie`
        }else if(id_movie){
            query1= `, ${peliculaXpersonajeTabla} pp where c.Id=pp.Id_personaje and pp.Id_pelicula=@Id_movie`
        }

        if(where && !id_movie){
            query+="WHERE " + query1
        }else{
            query+=query1
        }

        console.log(query)
        response=await dbHelper(undefined, {nombre,edad,id_movie,peso}, query)

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

        let response
        let query=`SELECT m.* from ${peliculaXpersonajeTabla} pp, ${peliculaTabla} m where pp.Id_personaje=@Id and pp.Id_pelicula=m.Id`;
        response=await dbHelper(id,undefined,query)
        let personaje
        let query2=`SELECT * from ${personajeTabla} WHERE Id=@Id`;
        personaje=await dbHelper(id,undefined,query2)

            personaje.recordset[0].movies=response.recordset;

        console.log(response)

        return personaje.recordset[0];
        }
}