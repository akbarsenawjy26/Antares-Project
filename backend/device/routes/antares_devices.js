const express = require("express");
const router = express.Router();
const controllerDevice = require("../controllers/antares_devices");

router.post("/", controllerDevice.insertDevice);
router.delete("/:deviceName", controllerDevice.deleteDevice);
module.exports = router;
