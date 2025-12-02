import { connection } from "../services/mongoDb.service.js"

export const getEventoModel = async () => {
    const conn = await connection();
    const result = await conn.collection('evento').find().toArray();
    return result;
}

export const postEventoModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection('evento').insertOne(info);
    return result;
}

export const postEventoManyModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection('evento').insertMany(info);
    return result;
}

export const getConsultaFiltradaModel = async () => {
    const conn = await connection();
    const result = await conn.collection("evento").find({}, {
        projection: {
            "deporte": 0,
            "_id": 0
        }
    }).toArray();
    return result;
}

export const getConsultaFiltradaDosModel = async () => {
    const conn = await connection();
    const result = await conn.collection("evento").aggregate([
        {
            $project: {
                _id: 0,
                fecha_evento: 1,  
                cuota_local: 1,
                cuota_empate: 1
            }
        },
        {
            $addFields: {
                porcentaje: {
                    $add: ["$cuota_local", "$cuota_empate"]
                }
            }
        },
        {"$sort": {"fecha_evento": -1}}
    ]).toArray();
    return result;
}
