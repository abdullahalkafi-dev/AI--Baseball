import { Types } from 'mongoose';
export type TChat={
    userId: Types.ObjectId  ;
    role: "user"|"assistant" ;
    message:string;
    createdAt: Date;
    updatedAt: Date;
    id: Types.ObjectId;
}