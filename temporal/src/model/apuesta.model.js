import { connection } from "../services/mongoDb.service.js"

export const getApuestaModel = async () => {
    const conn = await connection();
    const result = await conn.collection('apuesta').find().toArray();
    return result;
}

export const postApuestaModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection('apuesta').insertOne(info);
    return result;
}

export const postApuestaManyModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection('apuesta').insertMany(info);
    return result;
}

export const updateApuesta = async () => {
    /*
    $set
    $inc
    */

    const conn = await connection();
    const apuesta = await conn.collection('apuesta').findOne({ usuario: "maria.gonzalez@email.com" });
    const nuevoEstado = apuesta.estado === "ganada" ? "perdida" : "ganada";


    const result = await conn.collection('apuesta').updateOne(
        { usuario: "maria.gonzalez@email.com" },
        { $set: { estado: nuevoEstado, updatedAt: new Date() } }
        
    );

    return result;

}