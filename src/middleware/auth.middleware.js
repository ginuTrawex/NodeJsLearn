import jwt from 'jsonwebtoken'
import { secret, expiresIn } from '../../config/jwt.js'

export const authValidate = (req, res, next) => {
    const authHeadder = req.headers.authorization;

    try {
        const token = authHeadder.split(' ')[1];

        const decode = jwt.verify(token, secret);
        req.user = {
            'id': decode.id,
            'name': decode.name
        };
        if (!req.user) {
            return res.status(401).json({ message: 'Inavlid Token' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Inavlid Token/Token is missing' });
    }
}