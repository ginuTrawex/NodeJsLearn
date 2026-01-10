import db from "../../config/knex.js";
import createUserSchema from '../validations/user.validation.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await db('users').select('*');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

export const addUser = async (req, res) => {
    try {

        const { error, value } = createUserSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.details.map(d => d.message),
            });
        }

        const { name, email, age } = value;

        if (age !== undefined && isNaN(Number(age))) {
            return res.status(400).json({
                success: false,
                message: 'Age must be a number',
            });
        }

        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists',
            });
        }

        const [id] = await db('users').insert({
            name,
            email,
            ...(age && { age }),
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            userId: id,
        });
    } catch (error) {
        console.error('Create user error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Email already exists',
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
        });
    }
};

export const searchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db('users')
            .where({ id })
            .first();
        if (!user) return res.status(404).json({
            success: false,
            message: 'User not found',
        });

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;

        if (!name && !email && !age) {
            return res.status(400).json({
                success: false,
                message: 'At least one field is required to update',
            });
        }

        if (age !== undefined && isNaN(Number(age))) {
            return res.status(400).json({
                success: false,
                message: 'Age must be a number',
            });
        }

        const updatedRows = await db('users')
            .where({ id })
            .update({
                ...(name && { name }),
                ...(email && { email }),
                ...(age && { age }),
            });

        if (updatedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const updatedUser = await db('users')
            .where({ id })
            .first();

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        console.error('Update user error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Email already exists',
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await db('users')
            .where({ id })
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};