import { getUsuarioModel, postUsuarioManyModel, postUsuarioModel } from "../model/usuario.model.js";
import { updateBalance } from "../model/usuario.model.js";
import { connection } from "../services/mongoDb.service.js";

export const getUsuario = async (_, res) => {
    const result = await getUsuarioModel();
    res.json({ msg: "hola Usuario", data: result })

} 

export const postUsuario = async (req, res) => {
    const info = req.body;

    const conn = await connection();
    const usuariosToCheck = Array.isArray(info) ? info : [info];
    
    for (const usuario of usuariosToCheck) {
        const existingUser = await conn.collection('Usuario').findOne({ username: usuario.username });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                msg: `El correo ${usuario.username} ya está registrado` 
            });
        }
    }

    const result = (info.length) ? await postUsuarioManyModel(info) : await postUsuarioModel(info);

    res.json({ msg: "post usuario", result })
}

export const putUsuario = async (req, res) => {
    const result = await updateBalance();
    res.json({ msg: "put usuario", result });
}

export default {
    getUsuario,
    postUsuario,
    putUsuario
}