import {Router} from "express";
//import { getApuesta, postApuesta } from "../controller/apuesta.controller";
import Evento from "../controller/evento.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { eventoPost } from "../validator/evento.validator.js";

const route = Router();

route.get("/", Evento.getEvento);
route.post("/", validate(eventoPost), Evento.postEvento);
route.get("/filtro", Evento.getConsultaFiltrada);
route.get("/filtroDos", Evento.getConsultaFiltradaDos);

export default route;