const express = require('express');
const router = express.Router();

const VehicleController = require("../controllers/vehicle.controller");
const vehicleController = new VehicleController();

router.get("/general", (req, res) => {
    return res.send("You have called a general route");
});

router.get("/general/vehicles", vehicleController.showAll);
module.exports = router;