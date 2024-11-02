const request = require("request");
let _antaresAccessKey = "";
let _antaresPackageId = "";

exports.setAccessKey = function (accessKey) {
  _antaresAccessKey = accessKey;
};

exports.setPackageId = function (packageId) {
  _antaresPackageId = packageId;
};

exports.createDevice = function (projectName, deviceName) {
  const dataTemplate = {
    "m2m:cnt": {
      "xmlns:m2m": "http://www.onem2m.org/xml/protocols",
      rn: deviceName,
    },
  };

  return new Promise(function (resolve, reject) {
    const options = {
      method: "POST",
      url: `https://platform.antares.id:8443/~/antares-cse/antares-id/${projectName}`,
      headers: {
        "X-M2M-Origin": _antaresAccessKey, // The access key
        "Content-Type": "application/json;ty=3",
        Accept: "application/json",
        "X-Antares-Package": _antaresPackageId,
      },
      body: JSON.stringify(dataTemplate),
    };

    function callback(error, response, body) {
      if (error) {
        reject(`Error: ${error}`);
        return;
      }

      if (response.statusCode !== 201) {
        // HTTP Status Code for Created
        console.error(`HTTP Error: ${response.statusCode}`);
        console.error(`Response body: ${body}`);
        reject(`HTTP Error: ${response.statusCode} - ${body}`);
        return;
      }

      try {
        const data = JSON.parse(body)["m2m:cnt"];
        const finalData = {
          resource_name: data.rn,
          resource_identifier: data.ri,
          parent_id: data.pi,
          created_time: data.ct,
          last_modified_time: data.lt,
          acpi: data.acpi,
          et: data.et,
          oldest_data: data.ol,
          latest_data: data.la,
        };

        resolve(finalData);
      } catch (jsonError) {
        reject(`JSON Parse Error: ${jsonError}`);
      }
    }

    request(options, callback);
  });
};

exports.deleteDevice = function (projectName, deviceName) {
  return new Promise(function (resolve, reject) {
    const options = {
      method: "DELETE",
      url: `https://platform.antares.id:8443/~/antares-cse/antares-id/${projectName}/${deviceName}`,
      headers: {
        "X-M2M-Origin": _antaresAccessKey,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Antares-Package": _antaresPackageId,
      },
    };
    request(options);

    resolve("Request sent successfully without handling response");
  });
};
