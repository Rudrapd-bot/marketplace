const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({

    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },

    serviceName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    duration: {
        type: String
    },

    image: {
        type: String,
        default: ""
    },

    available: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);