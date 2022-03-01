/*
    Explain to students:

    There is no strict rule to use class for controller layer. Yet, using class you gain the benefit of inheritance.
    In a live project, controller that handles http requests may inherit from another BaseController. For example, if 
    there is a design to send accountId in the HTTP Request, you don't want to repeat the code on every controller. 
    You would create a BaseController to handle all those requests, and let VehicleController inherit it.

    Another use case will be permissions. Not every user will have permissions to invoke every API endpoints. You may
    want to define all permission metrics in a PermissionController and let VehicleController inherit it.
*/

// Import
const vehicleService = require("../services/vehicle.service");

class VehicleController {
  // POST /protected/onboard {driverId:1, vehicleId:1}
  async onboard(req, res, next) {

    console.log(typeof req.body.driverId, typeof req.body.vehicleId);
    if (
      typeof req.body.driverId !== "number" ||
      typeof req.body.vehicleId !== "number"
    ) {
      res.status(400); // bad request
      return res.json({ message: "Incorrect request data" });
    }

    // Consume the service layer
    const result = await vehicleService.onboard(req.body.vehicleId, req.body.driverId);    
    res.status(result.status);

    // Return results from service
    return res.json({ data: result.data, message: result.message });
  }

  async showAll(req, res, next){

    const result = await vehicleService.showAll();
    res.status = result.status;
    return res.json({data: result.data, message: result.message});
  }
}

module.exports = VehicleController;
