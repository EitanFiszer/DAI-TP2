import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'
import dbHelper from '../../Helper.js';

const peliculaTabla = process.env.DB_TABLA_PELICULA;
const personajeTabla = process.env.DB_TABLA_PERSONAJE;
const peliculaXpersonajeTabla = process.env.DB_TABLA_PELICULAPERSONAJE;

export class PeliculaService {

    createPelicula = async (pelicula) => {
        console.log('This is a function on the service');
        let response;
        let query=`INSERT INTO ${peliculaTabla}(Imagen, Titulo, Fecha, Calificacion) VALUES (@Imagen, @Titulo, @Fecha, @Calificacion)`
        response=await dbHelper(undefined,pelicula,query)
        console.log(response)

        return response.recordset;
    }

    updatePeliculaById = async (id, pelicula) => {
        console.log('This is a function on the service');
        let response;
        let query=`UPDATE ${peliculaTabla} SET Imagen = @Imagen, Titulo = @Titulo, Fecha = @Fecha, Calificacion = @Calificacion WHERE Id = @Id`;
        response=await dbHelper(id,pelicula,query)
        console.log(response)
        console.log(pelicula.id)

        return response.recordset;
    }

    deletePeliculaById = async (id) => {
        console.log('This is a function on the service');

        let response;
        let query=`DELETE FROM ${peliculaTabla} WHERE Id = @Id`;
        response=await dbHelper(id,undefined,query)
        console.log(response)

        return response.recordset;
    }

    getMovies = async (titulo, order) => {
        console.log('This is a function on the service');
        let response;
        let query=``;
        if(titulo && order){
            query=`SELECT * from ${peliculaTabla} WHERE Titulo LIKE %@Titulo% ORDER by Peliculas.Fecha ${order}`
        }else if(titulo){
            	query=`SELECT * from ${peliculaTabla} WHERE Titulo=@Titulo`
        }else if(order){
            	query=`SELECT * from ${peliculaTabla} ORDER BY Peliculas.Fecha ${order}`
        }else{
            query=`SELECT * from ${peliculaTabla}`;
        }
        response = await dbHelper(undefined,{titulo,order},query)
        console.log(response)
        return response.recordset;
    }


    getMovieById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id)
            .query(`SELECT p.* from ${peliculaXpersonajeTabla} pp, ${personajeTabla} p where pp.Id_pelicula=@Id and pp.Id_personaje=p.Id`);
        const pelicula = await pool.request()
            .input('Id',sql.Int, id)
            .query(`SELECT * from ${peliculaTabla} WHERE Id=@Id`);

            pelicula.recordset[0].characters=response.recordset;

        console.log(response)

        return pelicula.recordset[0];
    }
}

