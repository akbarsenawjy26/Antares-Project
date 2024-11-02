const express = require("express");
const router = express.Router();
const controllerSetting = require("../controllers/antares_settings");

router.post("/", controllerSetting.insertSetting);
router.put("/:id", controllerSetting.updateSetting);

module.exports = router;
