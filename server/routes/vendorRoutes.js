const express = require("express");

const router = express.Router();

const vendorController = require("../controllers/vendorControllers");

router.post("/", vendorController.createVendor);

router.get("/", vendorController.getVendors);

router.get("/:id", vendorController.getVendor);

router.put("/:id", vendorController.updateVendor);

router.delete("/:id", vendorController.deleteVendor);

module.exports = router;