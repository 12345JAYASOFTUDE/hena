import { Router } from 'express';
import {signupValidation,loginValidation} from '../middlewares/uservalidation';// Adjust the import path as needed
import { signUp } from '../controllers/usercontroller';
import { login } from '../controllers/usercontroller';

const router = Router();

// Route for user signup with validation
router.post('/signup', signupValidation, signUp);
router.post('/login', loginValidation, login);

export default router;
