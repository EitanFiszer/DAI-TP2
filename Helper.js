import sql from 'mssql'
import config from './db.js'

const dbHelper = async (id, params, query) => {
    const pool = await sql.connect(config);
    const response = await pool.request()
    .input('Id',sql.Int, id)
    .input('Nombre',sql.VarChar, params?.Nombre ?? '')
    .input('Imagen',sql.VarChar, params?.Imagen ?? '')
    .input('Edad',sql.Int, params?.Edad ?? 0)
    .input('Peso',sql.Float, params?.Peso ?? 0)
    .input('Historia',sql.VarChar, params?.Historia ?? '')
    .input('Nacimiento',sql.VarChar, params?.Nacimiento ?? '')
    .input('Titulo',sql.VarChar, params?.Titulo ?? '')
    .input('Fecha',sql.VarChar, params?.Fecha ?? '')
    .input('Calificacion',sql.Int, params?.Calificacion ?? 0)
    .query(query);
    return response;
};
export default dbHelper;