import Joi from 'joi';

const createUserSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .required()
        .messages({
            'string.min': 'Name length aleast 2',
            'string.base': 'Name must be a string',
            'string.empty': 'Name is required',
            'any.required': 'Name is required',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email must be a valid email',
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
        }),

    age: Joi.number()
        .integer()
        .min(0)
        .optional()
        .messages({
            'number.base': 'Age must be a number',
        }),
});

export default createUserSchema;