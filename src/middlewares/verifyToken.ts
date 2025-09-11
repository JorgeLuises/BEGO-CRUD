import express, { type Request, type Response, type NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export default function verificarToken (req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.header('auth-token');
    if (!token) return res.status(401).json({ErrorMessage: 'No cuentas con acceso, inicia sesión para continuar'});

    const payload = jwt.verify(token, process.env.SECRET_TOKEN || 'tokentst') as IPayload;
    req.userId = payload._id;

    next();
}