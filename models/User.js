import { hash, compareHashes } from "../lib/crypto.js";
import mongoose from "mongoose";

const { Schema, model } = mongoose

const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true}
}, { timestamps: true})

userSchema.statics.register = async function (data) {
    const hashed = await hash(data.password)
    console.log(data.password);
    console.log(hashed);
    data.password = hashed

    return User.create(data)
}

userSchema.statics.login = async function (data) {
    const user = await User.findOne({ username: data.username})
    console.log(data)
    console.log(user)
    if (!user){ return false }

    const success = await compareHashes(data.password, user.password)

    return success? user : false
}

const User = model("user", userSchema)

export default User