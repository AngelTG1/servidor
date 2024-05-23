import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        const error = err as Error; // Add type assertion to specify the type of 'err' as 'Error'
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
const { username, password } = req.body;

try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
} catch (err) {
    const error = err as Error; // Add type assertion to specify the type of 'err' as 'Error'
    res.status(500).json({ error: error.message });
}
};
