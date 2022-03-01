// Import sequelize
const { Sequelize } = require("sequelize");

// DB Connection Configuration
const sequelize = new Sequelize("lesson_db", "edisonzhuang", "", {
  host: "localhost",
  dialect: "postgres",
});

// Test connection function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}

// Import model(s)
const Vehicle = require("./vehicle.model")(sequelize);
const Driver = require("./driver.model")(sequelize);

// Create associations
Vehicle.belongsTo(Driver, {
    foreignKey:"driverId"
});

// Exports (remember enhanced object literal)
module.exports = {
  sequelize,
  testConnection,
  Vehicle,
  Driver,
};
