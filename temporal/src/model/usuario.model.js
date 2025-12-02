import { connection } from "../services/mongoDb.service.js"
import bcrypt from "bcryptjs";

export const getUsuarioModel = async () => {
    const conn = await connection();
    const result = await conn.collection('Usuario').find().toArray();
    return result;
}

export const postUsuarioModel = async (usuario) => {
    const conn = await connection();
        usuario.password = await bcrypt.hash(usuario.password, 10);
    const result = await conn.collection('Usuario').insertOne(usuario);
    return result;
}

export const postUsuarioManyModel = async (info) => {
    const conn = await connection();

    const usuariosHasheados = await Promise.all(
        info.map(async usuario => ({
            ...usuario,
            password: await bcrypt.hash(usuario.password, 10)
        }))
    );
    const result = await conn.collection('Usuario').insertMany(usuariosHasheados);
    return result;
}

export const updateBalance = async () => {
    /*
    $set
    $inc
    */
    const actual = 1600;
    const ganancia = 100;
    const total = actual + ganancia;
    const conn = await connection();
    const result = await conn.collection('Usuario').updateOne(
        { nombre: "Pablo Jose" },
        { $set: { saldo: total } }
    );
    return result;

}

