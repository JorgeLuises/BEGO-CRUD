import express, { type Request, type Response } from "express";
import User, { type IUser } from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function registro (req: Request, res: Response) {
    // ===== Guardando un nuevo usuario ===== //
    const user: IUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    const createdUser = await User.findOne({email: user.email});
    if (createdUser) return res.status(400).json({
        ErrorMessage: 'El usuario ya se encuentra registrado, intenta con un nuevo correo'
    });

    user.password = await bcrypt.hash(user.password, 10);
    const savedUser = await user.save();

    // ====== Creando un token ======= //
    const token: string = jwt.sign({_id: savedUser.id}, process.env.SECRET_TOKEN || 'tokentest', {expiresIn: 60 * 60 * 24});
    res.header('auth-token', token).json(savedUser);
};

export async function logIn (req: Request, res: Response) {
    // ====== Logueando un usuario ====== //
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({ErrorMessage: 'El usuario no se encuentra registrado'});

    const validPassword : boolean = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ErrorMessage: 'Contraseña incorrecta, vuelve a intentarlo'});

    // ====== Creando un token ======= //
    const token: string = jwt.sign({_id: user.id}, process.env.SECRET_TOKEN || 'tokentest', {expiresIn: 60 * 60 * 24});
    res.header('auth-token', token).json({message: 'Usuario logueado correctamente'});
};
