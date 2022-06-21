import { Router } from 'express';
import { PeliculaService } from '../services/peliculaService.js';
import { Authenticate } from '../common/jwt.strategy.js';
import  axios  from "axios"


const router = Router();
const peliculaService = new PeliculaService();

//Crea una pelicula
router.post('', Authenticate, async (req, res) => {
    console.log(`This is a post operation`);
  
    const pelicula = await peliculaService.createPelicula(req.body);
  
    return res.status(201).json(pelicula);
});
  
//Actualiza una pelicula
router.put('/:id', Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a put operation`);
  
    const pelicula = await peliculaService.updatePeliculaById(req.params.id, req.body);
    
  
    return res.status(200).json(pelicula);
  });

//Borra una pelicula
router.delete('/:id', Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a delete operation`);
  
    const pelicula = await peliculaService.deletePeliculaById(req.params.id);
  
    return res.status(200).json(pelicula);
})


//Trae todas las peliculas 
router.get('/', Authenticate, async (req, res) => {
  let titulo = req.query.titulo;
  let order = req.query.order
    console.log(`This is a get operation`);
  
    const pelicula = await peliculaService.getMovies(titulo,order);
  
    return res.status(200).json(pelicula);
  });

//Trae una pelicula según su Id y los actores
  router.get('/:id', Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);
  
    const movie = await peliculaService.getMovieById(req.params.id);
  
    return res.status(200).json(movie);
  });

export default router;

