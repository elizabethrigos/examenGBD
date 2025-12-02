import {Router} from "express";
//import { getApuesta, postApuesta } from "../controller/apuesta.controller";
import Apuesta from "../controller/apuesta.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { apuestaPost } from "../validator/apuesta.validator.js";

const route = Router();

route.get("/", Apuesta.getApuesta);
route.post("/", validate(apuestaPost), Apuesta.postApuesta);
route.put("/", Apuesta.putApuesta);

export default route;