import express, { type Request, type Response } from "express";
import { Types } from "mongoose";
import Truck, { type ITruck } from "../models/Truck.js";

export async function crearTruck(req: Request, res: Response) {
    try {
        const { year, color, plates } = req.body;

        // ===== Guardando un nuevo truck ===== //
        if (!year || !color || !plates) return res.status(400).json({ ErrorMessage: "Faltan datos obligatorios por ingresar" });

        const newTruck: ITruck = new Truck({
            user: new Types.ObjectId(req.userId),
            year,
            color,
            plates
        });

        const savedTruck = await newTruck.save();
        return res.status(201).json({ Message: "Registro creado existsamente", savedTruck });
    } catch (error) {
        return res.status(500).json({ ErrorMessage: "Error al crear el registro", error });
    }
}

export async function obtenerTrucks(req: Request, res: Response) {
    // ===== Obteniendo todos los trucks ===== //
    try {
        const trucks = await Truck.find().populate('user');
        return res.status(200).json({ Message: "Mostrando los registros", trucks });
    } catch (error) {
        return res.status(500).json({ ErrorMessage: "Error al obtener los registros", error });
    }
}

export async function actualizarTruck(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { year, color, plates } = req.body;

        if (!year || !color || !plates) return res.status(400).json({ ErrorMessage: "Faltan campos obligatorios por rellenar" });

        // ===== Actualizando un truck por su ID ===== //
        const updatedTruck = await Truck.findByIdAndUpdate(id, { year, color, plates }, { new: true });
        if (!updatedTruck) return res.status(404).json({ ErrorMessage: "Registro no encontrado", id });
        return res.status(200).json({ Message: "Registro actualizado exitosamente", updatedTruck });
    } catch (error) {
        return res.status(500).json({ ErrorMessage: "Error al actualizar el registro", error });
    }
}

export async function borrarTruck(req: Request, res: Response) {
    try {
        const { id } = req.params;

        // ===== Borrando un truck por su ID ===== //
        const deletedTruck = await Truck.findByIdAndDelete(id);
        if (!deletedTruck) return res.status(404).json({ ErrorMessage: "El registro no pudo ser encontrado", id });
        return res.status(200).json({ Message: "Regsitro eliminado de la base de datos exitosamente", deletedTruck });
    } catch (error) {
        return res.status(500).json({ ErrorMessage: "Error al eliminar este registro", error });
    }
}