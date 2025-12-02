import { getEventoModel, postEventoManyModel, postEventoModel, getConsultaFiltradaModel, getConsultaFiltradaDosModel } from "../model/evento.model.js";

export const getEvento = async (_, res) => {
    const result = await getEventoModel();
    res.json({ msg: "hola evento", data: result })

}

export const postEvento = async (req, res) => {
    const info = req.body;

    const result = (info.length) ? await postEventoManyModel(info) : await postEventoModel(info);

    res.json({ msg: "post evento", result })
}

export const getConsultaFiltrada = async (req, res) => {
    const result = await getConsultaFiltradaModel();
    res.json({msg: "hola evento", data: result})
}

export const getConsultaFiltradaDos = async (req, res) => {
    const result = await getConsultaFiltradaDosModel();
    res.json({msg: "hola evento", data: result})
}


export default {
    getEvento,
    postEvento,
    getConsultaFiltrada,
    getConsultaFiltradaDos
}