const Vendor = require("../models/Vendor");

// Create Vendor
exports.createVendor = async (req, res) => {
    try {

        const vendor = await Vendor.create(req.body);

        res.status(201).json({
            success: true,
            message: "Vendor Created Successfully",
            vendor
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Get All Vendors
exports.getVendors = async (req, res) => {
    try {

        const vendors = await Vendor.find().populate("user", "name email");

        res.json({
            success: true,
            vendors
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Get Vendor By ID
exports.getVendor = async (req, res) => {

    try {

        const vendor = await Vendor.findById(req.params.id)
            .populate("user", "name email");

        if (!vendor) {
            return res.status(404).json({
                message: "Vendor Not Found"
            });
        }

        res.json({
            success: true,
            vendor
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Update Vendor
exports.updateVendor = async (req, res) => {

    try {

        const vendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            vendor
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Delete Vendor
exports.deleteVendor = async (req, res) => {

    try {

        await Vendor.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Vendor Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};