const mongoose = require('mongoose')

const drawingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true })

const Drawing = mongoose.model("Drawing", drawingSchema)
module.exports = Drawing