// Create a new set of routes for protected
const express = require("express");
const router = express.Router(); // create route

// Import controller
const VehicleController = require("../controllers/vehicleController")
// Instantiate a new class instance
const vehicleController = new VehicleController();

router.get("/protected", (request, response) => {
  return response.send("You have called a protected route!");
});

router.post("/protected/onboard", vehicleController.onboard);
router.post("/protected/offboard", vehicleController.offboard);
router.put("/protected/vehicle", vehicleController.update);
router.delete("/protected/driver/:driverId", vehicleController.deleteDriver);

module.exports = router;
