import {Router} from "express";
import TournamentRoute from "./tournament.route.js";
import ApuestaRoute from "./apuesta.route.js";
import UsuarioRoute from "./usuario.route.js";
import eventoRoute from "./evento.route.js";
import AuthRoute from "./auth.route.js";
import { verifyToken } from "../middleware/token.middleware.js";


const route = Router();



route.use(TournamentRoute)
route.use('/apuesta', verifyToken, ApuestaRoute);
route.use('/usuario', verifyToken, UsuarioRoute);
route.use('/evento', verifyToken, eventoRoute);
route.use('/auth', AuthRoute);

export default route;
