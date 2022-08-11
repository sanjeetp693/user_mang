const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = new Schema({
    firstName: { type: String, default: "",trim: true},
    lastName: { type: String, default: "",trim: true},
    email: { type: String, lowercase: true, index: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    countryCode: { type: String, trim: true },
    isEmailVerify: { type: Boolean, default: false },
    isPhoneVerify: { type: Boolean, default: false },
    password: { type: String, default: "", select: false },
    profilePic: { type: String, default: "" },
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHERS"] },
    jti: { type: String, default: "", trim: true },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }, 
},
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);
const User = mongoose.model("user", UserModel);
module.exports = User;
