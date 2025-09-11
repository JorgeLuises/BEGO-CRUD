import express, { type Request, type Response } from "express";
import { Types } from "mongoose";
import Truck, { type ITruck } from "../models/Truck.js";

export async function crearTruck (req: Request, res: Response) {
    const { year, color, plates } = req.body; 
    
    // ===== Guardando un nuevo truck ===== //
    if (!year || !color || !plates) return res.status(400).json({ErrorMessage: "Faltan datos obligatorios por ingresar"});
    
    const newTruck: ITruck = new Truck({
        user: new Types.ObjectId(req.userId),
        year,
        color,
        plates
    });

    try {
        const savedTruck = await newTruck.save();
        return res.status(201).json({Message: "Registro creado existsamente", savedTruck});
    } catch (error) {
        return res.status(500).json({ErrorMessage: "Error al crear el registro", error});
    }
}