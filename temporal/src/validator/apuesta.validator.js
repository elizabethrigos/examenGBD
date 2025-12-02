import { checkSchema } from "express-validator";

export const apuestaPost = checkSchema({
    "*.usuario": {
        exists: {
            errorMessage: "El campo usuario es obligatorio"
        },
        notEmpty: {
            errorMessage: "Usuario no puede estar vacio"
        },
        isMongoId: {
            errorMessage: "El usuario debe ser un id valido"
        }
    },
    "*.evento": { 
        exists: {
            errorMessage: "El campo evento es obligatorio"
        },
        notEmpty: {
            errorMessage: "Evento no puede estar vacio"
        },
        isMongoId: {
            errorMessage: "El evento debe ser un id valido"
        }
    },
    "*.monto_apostado": {
        exists: {
            errorMessage: "El campo monto_apostado es obligatorio"
        },
        notEmpty: {
            errorMessage: "Monto apostado no puede estar vacio"
        },
        isInt: {
            options: { min: 1, max: 9999999999 },
            errorMessage: "El monto apostado debe ser un numero entero entre 1 y 10 digitos"
        }
    },
    "*.posible_ganancia": {
        exists: {
            errorMessage: "El campo posible_ganancia es obligatorio"
        },
        notEmpty: {
            errorMessage: "Posible ganancia no puede estar vacia"
        },
        isInt: {
            options: { min: 1, max: 9999999999 },
            errorMessage: "La posible ganancia debe ser un numero entero entre 1 y 10 digitos"
        }
    },
    "*.estado": {
        exists: {
            errorMessage: "El campo estado es obligatorio"
        },
        notEmpty: {
            errorMessage: "Estado no puede estar vacio"
        }
    }
}, ["body"]);

export default {
    apuestaPost
}