import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Signup validation schema
const signupSchema = Joi.object({
    username: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be less than or equal to 100 characters long',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Valid email is required',
        'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).max(100).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must be less than or equal to 100 characters long',
        'string.empty': 'Password is required',
    }),
    role: Joi.string().valid('admin', 'artist', 'enthusiast').required().messages({
        'any.only': 'Valid role is required',
        'string.empty': 'Role is required',
    }),

});

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Valid email is required',
        'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).max(100).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must be less than or equal to 100 characters long',
        'string.empty': 'Password is required',
    }),
});

// Signup validation middleware
export const signupValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ message: 'Bad request', errors: errorMessages });
    }
    next();
};

// Login validation middleware
export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ message: 'Bad request', errors: errorMessages });
    }
    next();
};
