const express = require('express');
const router = express.Router();

// Import
const VehicleController = require("../controllers/vehicle.controller");
// Instantiate the class
const vehicleController = new VehicleController();

router.get("/protected", (req, res) => {
    return res.send("You have called a protected route");
});

// Invoke onboard() in VehicleController based on the route
router.post("/protected/onboard", vehicleController.onboard);

module.exports = router;