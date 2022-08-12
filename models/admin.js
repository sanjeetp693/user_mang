const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdminModel = new Schema({
    name: { type: String, default: "",trim: true},
    email: { type: String, lowercase: true, index: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    countryCode: { type: String, trim: true },
    password: { type: String, default: "", select: false },
    profilePic: { type: String, default: "" },
},
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);
const Admin = mongoose.model("admin", AdminModel);
module.exports = Admin;
