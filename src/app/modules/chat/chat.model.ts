import { Schema, model } from 'mongoose';
import { Types } from 'mongoose';
import { TChat } from './chat.interface';



const chatSchema = new Schema<TChat>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

export const chat_messages = model<TChat>('chat_messages', chatSchema,"chat_messages");