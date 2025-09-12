import { type Request, type Response } from "express";
import { Types } from "mongoose";
import Order, { type IOrder } from "../models/Order.js";
import Truck from "../models/Truck.js";
import Location from "../models/Location.js";

export async function crearOrden(req: Request, res: Response) {
    try {
        const { truck, pickup, dropoff } = req.body;

        if (!truck || !pickup || !dropoff) return res.status(400).json({ ErrorMessage: 'Faltan datos obligatorios para la creación de una orden' });

        //  === Validar que las referencias existan en la base de datos === //
        const [truckExists, pickupExists, dropoffExists] = await Promise.all([
            Truck.findById(truck),
            Location.findById(pickup),
            Location.findById(dropoff)
        ]);

        if (!truckExists) {
            return res.status(404).json({ ErrorMessage: 'Transporte no encontrado' });
        } else if (!pickupExists || !dropoffExists) {
            return res.status(404).json({ ErrorMessage: 'La ubicación de recolección o de entrega no se encuentran en la base de datos' });
        }

        const newOrder: IOrder = new Order({
            user: new Types.ObjectId(req.userId),
            truck: new Types.ObjectId(truck),
            pickup: new Types.ObjectId(pickup),
            dropoff: new Types.ObjectId(dropoff)
        });

        // ========= Crecación de nueva orden ========== //
        const orderSaved = await newOrder.save();
        return res.status(201).json({ Message: 'Orden creada exitosamente', orderSaved });
    } catch (error) {
        return res.status(500).json({ ErrorMessage: 'Error interno al crear una nueva orden', error });
    }
};

export async function actualizarOrden(req: Request, res: Response) { 
    try {
        const { id } = req.params;
        const { truck, pickup, dropoff } = req.body;

        if (!truck || !pickup || !dropoff) return res.status(400).json({ ErrorMessage: 'Faltan datos obligatorios para la creación de una orden' });

        //  === Validar que las referencias existan en la base de datos === //
        const [truckExists, pickupExists, dropoffExists] = await Promise.all([
            Truck.findById(truck),
            Location.findById(pickup),
            Location.findById(dropoff)
        ]);

        if (!truckExists) {
            return res.status(404).json({ ErrorMessage: 'Transporte no encontrado' });
        } else if (!pickupExists || !dropoffExists) {
            return res.status(404).json({ ErrorMessage: 'La ubicación de recolección o de entrega no se encuentran en la base de datos' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { truck, pickup, dropoff }, { new: true });
        if (!updatedOrder) return res.status(400).json({ ErrorMessage: "El registro no se encuentra en la base de datos" });
        return res.status(200).json({ Message: "Registro actualizado exitosamente", updatedOrder })
    } catch (error) {
        return res.status(500).json({ErrorMessage: "Error interno del servidor", error});
    }
};

export async function verOrdenes(req: Request, res: Response) { 
    try {
        const ordenes = await Order.find().populate("user").populate("truck").populate("pickup").populate("dropoff");
        return res.status(200).json({Message: 'Ordenes enlistadas', ordenes});
    } catch (error) {
        return res.status(500).json({ErrorMessage: 'Error interno en servidor', error});
    }
};

export async function eliminarOrden(req: Request, res: Response) { 
    try {
        const { id } = req.params;

        // ===== Eliminar la orden de la base de datos ====== //
        const ordenEliminada = await Order.findByIdAndDelete(id);
        if (!ordenEliminada) return res.status(400).json({ ErrorMessage: "El registro no se encuentra en la base de datos" });
        return res.status(200).json({Message: 'Orden eliminada exitosamente', ordenEliminada});
    } catch (error) {
        return res.status(500).json({ErrorMessage: 'Error interno en servidor', error});
    }
};

export async function actualizarStatusOrden(req: Request, res: Response) { 
    try {
        const { id } = req.params;
        const { status } = req.body

        if (!status) return res.status(400).json({ErrorMessage: 'Se requiere de un estatus paraactualizar la orden'});

        if (status.toLowerCase() !== 'in transit' || status.toLowerCase() !== 'completed') return res.status(400).json({ErrorMessage: 'Estatus no valido para actualizar'});

        const updatedStatus = await Order.findByIdAndUpdate(id, {status}, {new: true});
        if (!updatedStatus) return res.status(400).json({ ErrorMessage: "El registro no se encuentra en la base de datos" });
        return res.status(200).json({Message: 'Estatus actualizado exitosamente', updatedStatus});
    } catch (error) {
        return res.status(500).json({ErrorMesssage: 'Error interno del servidor', error});
    }
};