import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from "../models/user.js";
import dotenv from 'dotenv';
dotenv.config({path: "./config/config.env"});

const secret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;

    try {
        const oldUser = await UserModel.findOne({email});

        if (oldUser) {
            return res.status(400).json({message: "User already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        });

        const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});
        res.status(201).json({result, token});

    } catch (error) {
        res.status(500).json({message: "Something went wrong!"});
        console.log(error);
    }
}