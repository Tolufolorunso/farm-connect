const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        trim: true,
    },
});

const Email = mongoose.model("Email", EmailSchema);

module.exports = Email;