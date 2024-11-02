const modelSettings = require("../models/antares_settings"); // Pastikan ini mengimpor dari index.js

const insertSetting = async (req, res) => {
  const { projectName, accessKey, packageId } = req.body;

  if (!projectName || !accessKey || !packageId) {
    return res.status(400).json({
      code: 400,
      message: "Request not found: missing required fields",
      data: {},
    });
  }

  try {
    const data = await modelSettings.create({
      // Menggunakan modelSettings yang diimpor
      projectName,
      accessKey,
      packageId,
    });

    return res.status(201).json({
      code: 201,
      message: "Setting created successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Error creating setting",
      error: error.message,
    });
  }
};

const updateSetting = async (req, res) => {
  const { id } = req.params;
  const { projectName, accessKey, packageId } = req.body;

  // Validasi input
  if (!id || !projectName || !accessKey || !packageId) {
    return res.status(400).json({
      code: 400,
      message: "Bad Request: Missing required fields",
      data: null,
    });
  }

  try {
    const findData = await modelSettings.findByPk(id);

    // Jika data tidak ditemukan
    if (!findData) {
      return res.status(404).json({
        code: 404,
        message: `Data with id ${id} not found`,
        data: null,
      });
    }

    // Update data
    findData.projectName = projectName;
    findData.accessKey = accessKey;
    findData.packageId = packageId;
    await findData.save();

    return res.status(200).json({
      code: 200,
      message: "Data updated successfully",
      data: findData,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Error updating setting",
      error: error.message,
    });
  }
};

module.exports = {
  insertSetting,
  updateSetting,
};
