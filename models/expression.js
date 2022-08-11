const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpressionModel = new Schema({
    tittle: { type: String, default: ""},
    messages: { type: String, default: ""},
    userId: {type: Schema.Types.ObjectId,ref: 'User',default: null},
    isDeleted: { type: Boolean, default: false },
},
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);
const Expression = mongoose.model("expression", ExpressionModel);
module.exports = Expression;
