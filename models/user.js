import {Schema, model, models} from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, uinque: true },
    name: { type: String },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const User = models.user || model('user', userSchema);
export default User;

