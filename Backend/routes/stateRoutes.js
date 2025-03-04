const routes = require('express').Router();
const stateController = require("../controllers/stateController");

routes.post("/addstate", stateController.addState);
routes.get("/getallstates", stateController.getAllStates);

module.exports = routes;