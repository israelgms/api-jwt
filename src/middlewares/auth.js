import jwt from "jsonwebtoken"
import authConfig from "../config/auth.js"

export default async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        res.status(401).json({ error: 'Token was not provided.'})
    }

    //Chegara como: Bearer XXXX. Pegaremos a segunda string XXXX do array e o split removera os espaços.
    const [, token] = authHeader.split(' ')


    try {
        const decoded = jwt.verify(token, authConfig.secret);
        req.userId = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({error: 'Invalid Token'})
    }

}