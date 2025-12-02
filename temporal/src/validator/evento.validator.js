import { checkSchema } from "express-validator";

export const eventoPost = checkSchema({
    "*.deporte": {
        exists: {
            errorMessage: "El campo deporte es obligatorio"
        },
        notEmpty: {
            errorMessage: "Deporte no puede estar vacio"
        },
        isLength: {
            options: { min: 3, max: 50 },
            errorMessage: "El deporte debe tener minimo 3 y maximo 50 caracteres"
        }
    },
    "*.evento": { 
        exists: {
            errorMessage: "El campo evento es obligatorio"
        },
        notEmpty: {
            errorMessage: "Evento no puede estar vacio"
        },
        isLength: {
            options: { min: 5, max: 200 },
            errorMessage: "El evento debe tener minimo 5 y maximo 200 caracteres"
        }
    },
    "*.fecha": {
        exists: {
            errorMessage: "El campo fecha es obligatorio"
        },
        notEmpty: {
            errorMessage: "Fecha no puede estar vacia"
        },
        matches: {
            options: /^\d{4}-\d{2}-\d{2}$/,
            errorMessage: "La fecha debe estar en formato YYYY-MM-DD"
        }
    },
    "*.cuotas.cuota_local": {
        exists: {
            errorMessage: "El campo cuota_local es obligatorio"
        },
        isFloat: {
            options: { min: 1.0 },
            errorMessage: "La cuota_local debe ser un numero"
        }
    },
    "*.cuotas.cuota_visitante": {
        exists: {
            errorMessage: "El campo cuota_visitante es obligatorio"
        },
        isFloat: {
            options: { min: 1.0 },
            errorMessage: "La cuota_visitante debe ser un numero"
        }
    },
    "*.cuotas.cuota_empate": {
        optional: true,
        isFloat: {
            options: { min: 1.0 },
            errorMessage: "La cuota_empate debe ser un numero"
        }
    }
}, ["body"]);

export default {
    eventoPost
}