import { checkSchema } from "express-validator";

export const usuarioPost = checkSchema({
    "*.nombre": {
        errorMessage: "Nombre invalido",
        notEmpty: true,
        isLength: {
            options: { min: 3, max: 100 },
            errorMessage: "El nombre debe tener minimo 3 y maximo 100 caracteres"
        }

    },
    "*.password": {
        exists: {
            errorMessage: "La contraseña debe existir"
        },
        notEmpty: {
            errorMessage: "La contraseña no puede estar vacía"
        },
        isString: {
            errorMessage: "La contraseña debe ser un string"
        },
        isLength: {
            options: { min: 6, max: 20 },
            errorMessage: "La contraseña debe tener entre 6 y 20 caracteres"
        }
    },
    "*.username": {
        exists: {
            errorMessage: "El username debe existir"
        },
        matches: {
            options: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
        },
        errorMessage: "El correo no es valido"
    },
    "*.saldo": {
        exists: {
            errorMessage: "El campo saldo es obligatorio"
        },
        notEmpty: {
            errorMessage: "Saldo no puede estar vacio"
        },
        isInt: {
            options: { min: 1, max: 9999999999 },
            errorMessage: "El saldo debe ser un numero entero entre 1 y 10 digitos"
        }
    }

}, ["body"]);
 
export default {
    usuarioPost
}