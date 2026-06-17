const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    businessName: {
        type: String,
        required: true
    },

    ownerName: {
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

    phone: {
        type: String
    },

    email: {
        type: String
    },

    address: {
        type: String
    },

    city: {
        type: String
    },

    image: {
        type: String,
        default: ""
    },

    verified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("Vendor", vendorSchema);