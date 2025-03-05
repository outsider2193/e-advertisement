const { createHoarding, getHoardings } = require("../controllers/hoardingController");
const routes = require("express").Router();
const { verifyToken, authorizedRoles } = require("../middleware/authMiddleware");

routes.post("/hoarding/post", verifyToken, authorizedRoles("advertiser"), createHoarding);
routes.get("/hoarding/get", verifyToken, authorizedRoles("advertiser"), getHoardings);

module.exports = routes;