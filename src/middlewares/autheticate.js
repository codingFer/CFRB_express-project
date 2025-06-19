import jwt from 'jsonwebtoken';
import config from "../config/env.js";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401)
    };

    // verificamos y decodificamos
    jwt.verify(token, config.JWT_SECRET, (error, user) => {
        console.log('test2');
        console.log(user);
        console.log('test2');
        if (error) return res.sendStatus(403);
        
        req.user = user;
    })
    next();
}

export default authenticateToken;