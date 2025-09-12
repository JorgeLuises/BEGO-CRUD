import { Schema, model, Document, type ObjectId } from "mongoose";

export interface IOrder extends Document {
    user: ObjectId;
    truck: ObjectId;
    status: string;
    pickup: ObjectId;
    dropoff: ObjectId;
}

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    truck: {
        type: Schema.Types.ObjectId,
        ref: 'Truck',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'in transit', 'completed'],
        default: 'created'
    },
    pickup: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    dropoff: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
});

export default model<IOrder>('Order', orderSchema);