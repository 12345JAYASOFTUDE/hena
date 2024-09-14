import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/usermodel'; // Adjust import based on your export
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

// Signup controller
export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    // Hash the password
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare passwords
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Create a JWT token
      const token = jwt.sign(
          { id: user.id, email: user.email }, // Sequelize uses `user.id` for primary key
          process.env.JWT_SECRET || 'your_jwt_secret',
          { expiresIn: '1h' }
      );

      return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};
