import {Router} from "express";
//import { getApuesta, postApuesta } from "../controller/apuesta.controller";
import Usuario from "../controller/usuario.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { usuarioPost } from "../validator/usuario.validator.js";

const route = Router();

route.get("/", Usuario.getUsuario);
route.post("/", validate(usuarioPost), Usuario.postUsuario);
route.put("/", Usuario.putUsuario);



export default route;