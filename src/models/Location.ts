import { Schema, model, Document, Types } from "mongoose";

export interface ILocation extends Document {
    address: string;
    place_id: string;
    latitude: number;
    longitude: number;
    _id: Types.ObjectId;
}

const locationSchema = new Schema({
    address: {
        type: String,
        required: true,
        unique: true,
    },
    place_id: {
        type: String,
        required: true,
        unique: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

export default model<ILocation>("Location", locationSchema);