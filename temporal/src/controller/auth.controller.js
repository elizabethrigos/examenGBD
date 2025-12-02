import { generateToken } from "../services/token.service.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../services/mail.service.js";
import { createClient } from "redis";
import { connection } from "../services/mongoDb.service.js";

export const verifyOtp = async (req, res) => {
    try {
        const { username, otp } = req.body;
        if (!username || !otp) {
            return res.status(400).json({ success: false, msg: "Faltan datos" });
        }

        const otpDataStr = await redisClient.get(`otp:${username}`);

        if (!otpDataStr) {
            return res.status(401).json({ success: false, msg: "OTP expirada" });
        }

        const otpData = JSON.parse(otpDataStr);

        if (otpData.otp !== String(otp)) {
            return res.status(401).json({ success: false, msg: "OTP incorrecta" });
        }

        await redisClient.del(`otp:${username}`);


        const expiresIn = 3600; 
        const token = generateToken({ username });
        const user =  username ;

        return res.status(200).json({
            success: true,
            token,
            expiresIn,
            user
        });

    } catch (e) {
        res.status(500).json({ success: false, msg: "Error en verificación de OTP" });
    }
};

const redisClient = createClient();
redisClient.connect();

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const conn = await connection();
        const user = await conn.collection('Usuario').findOne({ username });

        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "Credenciales incorrectas"
            });
        }

        const valid = await bcrypt.compare(password, user.password);
        
        if (!valid) {
            return res.status(401).json({
                success: false,
                msg: "Credenciales incorrectas"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiraEn = 300;

        await redisClient.setEx(
            `otp:${username}`,
            expiraEn,
            JSON.stringify({ otp, expiraEn })
        );

        await sendMail(
            user.username, 
            "hola👽",
            `<h2>Tu OTP es: ${otp} Válido por 5 minutos. </h2>`
        );

        return res.status(200).json({
            success: true,
            msg: "OTP enviada al correo",
            otp: otp,
            expiraEn: expiraEn
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            msg: "Auth error"
        });
        console.error(e);
    }
};