import { Router } from 'express';
import { PersonajeService } from '../services/personajeService.js';
import { Authenticate } from '../common/jwt.strategy.js';


const router = Router();
const personajeService = new PersonajeService();

//Trae personajes segun su nombre, edad o pelicula
router.get('/', Authenticate, async (req, res) => {
  console.log(`This is a get operation`);
  let nombre = req.query.nombre;
  let edad = req.query.edad;
  let id_movie = req.query.id_movie;
  let peso= req.query.peso;

  
  const personaje = await personajeService.getPersonaje(nombre,edad,id_movie,peso);

  return res.status(200).json(personaje);
});


//Crea personaje
router.post('', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const personaje = await personajeService.createPersonaje(req.body);

  return res.status(201).json(personaje);
});

//Actualiza personaje 
router.put('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const personaje = await personajeService.updatePersonajeById(req.params.id, req.body);
  

  return res.status(200).json(personaje);
});

//Borra personaje
router.delete('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const personaje = await personajeService.deletePersonajeById(req.params.id);

  return res.status(200).json(personaje);
});


//Trae un personaje y sus peliculas
router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const personaje = await personajeService.getCharacterById(req.params.id);

  return res.status(200).json(personaje);
});

export default router;
