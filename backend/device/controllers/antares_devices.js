const antares = require("../helpers/antares");
const modelDevice = require("../models/antares_device");
const modelSetting = require("../models/antares_settings");
require("dotenv").config();

const insertDevice = async (req, res) => {
  const { deviceName } = req.body;
  const setting = await modelSetting.findOne({ where: { id: 1 } });

  try {
    antares.setAccessKey(setting.accessKey);
    antares.setPackageId(setting.packageId);
    const response = await antares.createDevice(setting.projectName, deviceName);

    const data = await modelDevice.create({
      resourceName: response.resource_name,
      resourceIdentifier: response.resource_identifier,
      parentId: response.parent_id,
      createdTime: response.created_time,
      lastModifiedTime: response.last_modified_time,
      oldestData: response.oldest_data,
      latestData: response.latest_data,
    });

    return res.status(200).json({
      code: 200,
      message: "Created Device is Sucessfully",
      data: data,
    });
  } catch (error) {
    console.error("Error inserting device:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteDevice = async (req, res) => {
  const { deviceName } = req.params;
  const setting = await modelSetting.findOne({ where: { id: 1 } });

  try {
    antares.setAccessKey(setting.accessKey);
    antares.setPackageId(setting.packageId);
    const response = await antares.deleteDevice(setting.projectName, deviceName);
    console.log(response);

    const data = await modelDevice.destroy({ where: { resourceName: deviceName } });
    return res.status(200).json({
      code: 200,
      message: "Delete Device is Sucessfully",
      data: data,
    });
  } catch (error) {
    console.error("Error deleting device:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  insertDevice,
  deleteDevice,
};
