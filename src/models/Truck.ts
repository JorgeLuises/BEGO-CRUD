import { Schema, model, Document, type ObjectId } from "mongoose";

export interface ITruck extends Document {
    user: ObjectId;
    year: string;
    color: string;
    plates: string;
}

const truckSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    year: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    plates: {
        type: String,
        required: true
    },
});

export default model<ITruck>('Truck', truckSchema);