const Service = require("../models/Service");

// Add Service
exports.createService = async (req, res) => {

    try {

        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            service
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get All Services
exports.getServices = async (req, res) => {

    try {

        const services = await Service.find().populate("vendor");

        res.json({
            success: true,
            services
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get One Service
exports.getService = async (req, res) => {

    try {

        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                message: "Service Not Found"
            });
        }

        res.json({
            success: true,
            service
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Update Service
exports.updateService = async (req, res) => {

    try {

        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            service
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Delete Service
exports.deleteService = async (req, res) => {

    try {

        await Service.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Service Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};