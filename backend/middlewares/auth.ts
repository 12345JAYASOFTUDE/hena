import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config(); // Load environment variables from .env file

// Extend the Request interface to include the user object
interface AuthenticatedRequest extends Request {
    user?: jwt.JwtPayload | string;
}

// Middleware to verify JWT
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    
    if (token == null) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid Token' });
        }
        
        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware or route handler
    });
};

export default authenticateToken;
