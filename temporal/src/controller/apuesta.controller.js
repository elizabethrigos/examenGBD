import { getApuestaModel, postApuestaManyModel, postApuestaModel, updateApuesta } from "../model/apuesta.model.js";

export const getApuesta = async (_, res) => {
    const result = await getApuestaModel();
    res.json({ msg: "hola Apuesta", data: result })

}

export const postApuesta = async (req, res) => {
    const info = req.body;
    info.usuario = new ObjectId(info.usuario);
    info.evento = new ObjectId(info.evento);

    const result = (info.length) ? await postApuestaManyModel(info) : await postApuestaModel(info);

    res.json({ msg: "post evento", result })
}

export const putApuesta = async (req, res) => {
    const result = await updateApuesta(req.body);
    res.json({ msg: "put apuesta", result });
}

export default {
    getApuesta,
    postApuesta,
    putApuesta
}