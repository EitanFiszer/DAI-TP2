import sql from 'mssql'
import config from './db.js'

const dbHelper = async (id, params, query) => {
    const pool = await sql.connect(config);
    const response = await pool.request()
    .input('Id',sql.Int, id)
    .input('Nombre',sql.VarChar, params?.nombre ?? '')
    .input('Imagen',sql.VarChar, params?.imagen ?? '')
    .input('Edad',sql.Int, params?.edad ?? 0)
    .input('Peso',sql.Float, params?.peso ?? 0)
    .input('Historia',sql.VarChar, params?.historia ?? '')
    .input('Nacimiento',sql.VarChar, params?.nacimiento ?? '')
    .input('Titulo',sql.VarChar, params?.titulo ?? '')
    .input('Fecha',sql.VarChar, params?.fecha ?? '')
    .input('Calificacion',sql.Int, params?.calificacion ?? 0)
    .input('Id_movie',sql.Int, params?.id_movie ?? 0)
    .query(query);
    return response;
};
export default dbHelper;