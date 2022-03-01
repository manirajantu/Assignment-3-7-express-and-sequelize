Recall:
Routing -> Controller -> Services -> ORM// Routes (The Bus route) -> endpoints or resources (ex. POST /protected/onboard)
Controller (The Bus itself) -> take the data from the client (request) and return the necessary response
Services (The Bus driver) -> business logic takes place and connects to the ORM 
Models (The Bus driver's brain and hands) -> ORM that maps the database tables to models

Code along:
1. Copy lesson 3.6 (sequelize) into new folder (which is here)
2. Create folder called routes in root folder and inside create 3 files called index.js, protected.routes.js, general.routes.js 
3. In root index.js, use routes' index.js and listen to port 3000
4. Create folder called controllers in root folder and inside create a file called vehicle.controller.js
5. Link the controller to the route
6. Create a folder called services and inside the folder, a file called vehicle.service.js
7. Connect the service to ORM and controller