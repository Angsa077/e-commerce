import bcrypt from "bcrypt";
import User from "../models/user.js";
import generateToken from "../utils/authToken.js";

const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({
        where: {
            email: email,
        },
    });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            name: name, // use the 'name' variable from req.body
            email: email, // use the 'email' variable from req.body
            password: hashedPassword,
        });
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email,
        },
    });

    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid password" });
    }

    try {
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { register, login };
