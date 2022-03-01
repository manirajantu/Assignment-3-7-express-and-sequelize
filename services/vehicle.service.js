const { Vehicle, Driver } = require("../models");

module.exports = {
  onboard: async (vehicleId, driverId) => {
    let result = {
      message: null,
      status: null,
      data: null,
    };
    const vehicle = await Vehicle.findByPk(vehicleId);
    const driver = await Driver.findByPk(driverId);

    if (!vehicle) {
        result.message = `Vehicle ID ${vehicleId} is not found.`;
        result.status = 404;
        return result;
      }

    if (vehicle.driverId) {
      result.message = `Vehicle ID ${vehicle.id} is already in use.`;
      result.status = 400;
      return result;
    }

    if (!driver) {
      result.message = `Driver ID ${driverId} is not found.`;
      result.status = 404;
      return result;
    }

    vehicle.driverId = driver.id;
    await vehicle.save();
    result.data = vehicle;
    result.status = 200;
    result.message = "Onboard successful";

    return result;
  },

  showAll: async () => {
    let result = {
      message: null,
      status: null,
      data: null
    }

    const data = await Vehicle.findAll({include: [{
      model: Driver 
    }]
  });

  result.message = "Data fetched successfully from database";
  result.status = 200;
  result.data = data;
  return result;
  }



};
