import  jwt  from "jsonwebtoken";
import 'dotenv/config';

export const generateToken = (data) => {
    return jwt.sign({     
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hora
        data: data 
        
    }, process.env.JWT_SECRET)
}