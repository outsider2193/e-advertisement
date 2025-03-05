const routes = require('express').Router();
const stateController = require("../controllers/stateController");
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware")
routes.post("/addstate", verifyToken, authorizedRoles("advertiser"), stateController.addState);
routes.get("/getstates", verifyToken, stateController.getAllStates);

module.exports = routes;