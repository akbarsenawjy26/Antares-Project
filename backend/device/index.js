const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerSetting = require("./routes/antares_settings");
const routerDevice = require("./routes/antares_devices");

app.use("/api/v1/settings", routerSetting);
app.use("/api/v1/device", routerDevice);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
