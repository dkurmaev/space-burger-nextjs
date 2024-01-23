import {model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema({
    email: { type: String , required: true},
    city: { type: String },    
    plz: { type: String },
    country: { type: String },
    phone: { type: String },
    street: { type: String },
    admin: { type: Boolean, default: false },
}, { timestamps: true });

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema)