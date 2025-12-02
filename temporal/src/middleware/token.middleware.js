import jwt from "jsonwebtoken";
import 'dotenv/config';

export const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ 
            msg: "user unauthorized",
            success: false
         });
    }

    token = token.split(" ");
    if (token[0] !== "Bearer") {
        return res.status(401).json({ 
            msg: "user unauthorized",
            success: false
         });
    }

    jwt.verify(token[1], process.env.JWT_SECRET, (err, ) => {
        if (err) {
            return res.status(401).json({ 
                msg: "user unauthorized",
                success: false
             });
        }

        next();
    })
}