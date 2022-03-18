import jwt from "jsonwebtoken"

import User from "../models/User.js"
import { checkPassword } from "../services/auth.js"

import authConfig from "../config/auth.js"

class SessionController {
    async create(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(401).json({ error: "User / password invalid." })
        }

        const passwordChecked = await checkPassword(user,password)

        if(!passwordChecked) {
            return res.status(401).json({ error: "User / password invalid." })
        }

        const { id } = user;

        return res.json({
            user: {
                id,
                email
            },
            token: jwt.sign({ id: id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
         }
        )
        
    }

    async verify(req, res) {
        const authHeader = req.headers.authorization
        const [, token] = authHeader.split(' ')

        try {
            const decoded = jwt.verify(token, authConfig.secret); 
            const id = decoded.id;
            const user = await User.findOne({ id })            
            return res.json(user.email)
        } catch (error) {
            return res.status(401).json({error: 'Invalid Token'})
        }
    }
}

export default new SessionController();