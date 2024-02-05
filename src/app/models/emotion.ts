import { Schema, model, models } from "mongoose";
const mongoose = require('mongoose');

// Definir el esquema de frase individual
const fraseSchema = new Schema({
    frase: String
});

const EmotionSchema = new Schema(
    {
        emotion: {
            type: String,
            unique: true,
            default: 'test'
        },
        frases: [{
            lote: String,
            loteId: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
            frases: [fraseSchema]
        }]
    },
    {
        timestamps: true,
    }
);

const Emotion = models.Emotion || model("Emotion", EmotionSchema);
export default Emotion;