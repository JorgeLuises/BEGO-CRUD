import { type Request, type Response } from 'express';
import { Types } from 'mongoose';
import Location, { type ILocation } from '../models/Location.js';

export async function obtenerUbicaciones (req: Request, res: Response) {
    try {
        const ubicaciones = await Location.find();
        return res.status(200).json({ Message: 'Ubicaciones obtenidas', ubicaciones });
    } catch (error) {
        return res.status(500).json ({ Message: 'Error al buscar ubicaciones', error });
    }
}

export async function crearUbicacion (req: Request, res: Response) {
    const { address, place_id, latitude, longitude } = req.body;

    if (!address || !place_id || !latitude || !longitude) return res.status(400).json({ ErrorMessage: 'Faltan datos obligatorios por ingresar'});

    // ===== Verificar si ya existe la ubicación en la base de datos ===== //
    const existeUbicacion = await Location.findOne({ place_id });
    if (existeUbicacion) return res.status(400).json({ ErrorMessage: 'La ubicación ya se encuentra registrada', existeUbicacion});

    // ===== Crear nueva ubicación ===== //
    const nuevaUbicacion: ILocation = new Location ({
        address,
        place_id,
        latitude,
        longitude
    });

    try {
        const ubicacionGuardada = await nuevaUbicacion.save();
        return res.status(201).json({ Message: 'Ubicación agregada con exito', ubicacionGuardada });
    } catch (error) {
        return res.status(500).json({ ErrorMessage: 'Error al registrar una nueva ubicación', error });
    }
}

export async function actualizarUbicacion (req: Request, res: Response) {
    const { id } = req.params;
    const { address, place_id, latitude, longitude } = req.body;

    const objectId = new Types.ObjectId(id);

    if (!address || !place_id || !latitude || !longitude) return res.status(400).json({ ErrorMessage: 'Faltan datos obligatorios por ingresar'});

    // ===== Verificar si ya existe la ubicación en la base de datos ===== //
    const existeUbicacion: ILocation | null = await Location.findOne({ place_id });
    if (existeUbicacion && !existeUbicacion._id.equals(objectId)) return res.status(400).json({ ErrorMessage: 'La ubicación ya se encuentra registrada', existeUbicacion});

    // ===== Actualizar ubicación ===== //
    try {
        const ubicacionActualizada = await Location.findByIdAndUpdate(id, { address, place_id, latitude, longitude }, { new:true });
        if (!ubicacionActualizada) return res.status(404).json({ ErrorMessage: 'Registro no encontrado en la base de datos', id });
        return res.status(200).json({ Message: 'Ubicación actualizada correctamente', ubicacionActualizada });
    } catch (error) {
        return res.status(500).json({ ErrorMessage: 'Error al actualizar la ubicación', error });
    }
}

export async function eliminarUbicacion (req: Request, res: Response) {
    const { id } = req.params;

    // ===== Eliminar ubicación ===== //
    try {
        const ubicacionEliminada = await Location.findByIdAndDelete(id);
        if (!ubicacionEliminada) return res.status(404).json({ ErrorMessage: 'Registro no encontrado en la base de datos', id });
        return res.status(200).json({ Message: 'Ubicación eliminada correctamente', ubicacionEliminada });
    } catch (error) {
        return res.status(500).json({ ErrorMessage: 'Error al eliminar la ubicación de la base', error });
    }
}