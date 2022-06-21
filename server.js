import express from "express";
import cors from "cors";
import passport from 'passport';
import { jwtStrategy } from './src/common/jwt.strategy.js';
import PersonajeRouter from "./src/controllers/personajeController.js";
import AuthRouter from "./src/controllers/authController.js"
import PeliculaRouter from "./src/controllers/peliculaController.js";
import Axios from "axios"

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/characters", PersonajeRouter);
app.use("/movies", PeliculaRouter);
app.use("/auth", AuthRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

