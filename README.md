# Express and Sequelize

## Brief

This lesson requires the codebase you have written in the previous lesson. Last lesson we created the ORM layer with sequelize. In this lesson, we will work on express routing, controller and service layers.

### Part 1 - Creating routes.

Step 1: Change directory to the root directory of this GIT repo on Terminal, install express package with `npm install express`.

Step 2: Remove all the code that is left over by previous lesson in `./index.js`.

Step 3: Create three files in `./routes` folder.

- `./routes/protected.routes.js`
- `./routes/general.routes.js`
- `./routes/index.js`

Step 4: Add code into the files created.

In `protected.routes.js`, add the following codes.

```js
const express = require('express');
const router = express.Router();

router.get("/protected", (req, res) => {
    return res.send("You have called a protected route");
});

module.exports = router;
```

In `general.routes.js`, add the following codes.

```js
const express = require('express');
const router = express.Router();

router.get("/general", (req, res) => {
    return res.send("You have called a general route");
});

module.exports = router;
```

In `index.js`, add the following codes.

```js
const express = require("express");
const app = express();
app.use(express.json()); // Enable express to parse JSON as request body.
const protectedRoutes = require("./protected.routes");
const generalRoutes = require("./general.routes");

app.use(protectedRoutes);
app.use(generalRoutes);

module.exports = app;
```

Step 5: Run express by adding the following codes to `./index.js` at the project root directory.

```js
const app = require('./routes');
app.listen(3000, () => {
  console.log('Listening to port 3000...');
})
```

Now, run `npm run start` on Terminal.

Go to browser and enter the following URL to see the express at work.

1. `http://localhost:3000/general`
1. `http://localhost:3000/protected`

### Part 2 - Add Controller Layer

Step 1: Create `./controllers/vehicle.controller.js` and add the follow codes.

```js
class VehicleController {

    // POST /protected/onboard {driverId:1, vehicleId:1}
    onboard(req, res, next){
        if(typeof req.body.driverId !== "number" || typeof req.body.vehicleId !== "number"){
            res.status(400); // bad request
            return res.json({message:"Incorrect request data"});
        }

        return res.json({message:"request received!"});
    }
}

module.exports = VehicleController;
```

Step 2: Wire this controller up with Express Router.

Add the following code in `./routes/protected.routes.js`.

```js
// Import
const VehicleController = require("../controllers/vehicle.controller");
// Instantiate the class
const vehicleController = new VehicleController();

// Invoke onboard() in VehicleController based on the route
router.post("/protected/onboard", vehicleController.onboard);
```

Step 3: Call this endpoint with Browser Extension.

Request: `POST http://localhost:3000/protected/onboard`
RequestBody: 
``` js
{
    "vehicleId", 1,
    "driver":1
}
```

Try it with missing request body to let the endpoint return 400 status.

### Part 3 - Create the service layer

Step 1: Create file `./services/vehicle.service.js` and add the follow codes.

```js
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
};

```

Step 2: Update `./controllers/vehicle.controller.js` with the following codes.

```js
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
}

module.exports = VehicleController;
```

Step 3: Run the same onboard endpoint and notice the change. 

If you are unable to onboard a vehicle, simple perform an update operation on your database via Terminal `psql` session.

```
update "vehicles" set "driver_id" = null; // unassign all
```