
import jwt from 'jsonwebtoken'
import { secret, expiresIn } from '../../config/jwt.js'

export const createToken = async (req, res) => {
    try {
        const { id, name } = req.body;
        if (!id || !name) {
            return res.status(404).json({ message: 'Invalid user' });
        }

        const token = jwt.sign({
            id: id, name: name
        }, secret, { expiresIn });

        res.status(200).json({ "name": name, "token": token, "expire_in": expiresIn });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Failed to create token' });
    }
}