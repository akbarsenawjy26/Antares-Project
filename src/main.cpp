#include <Arduino.h>
#include <AntaresESPMQTT.h>

#define ACCESSKEY "0d821832d7891950:c67abf7582e43b62"
#define WIFISSID "oke makasi"
#define PASSWORD "kaliporong84"
#define projectName "antares-monitoring" // Name of the application created in Antares
#define deviceName "node-1"

AntaresESPMQTT antares(ACCESSKEY);

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  antares.setDebug(true);
  antares.wifiConnection(WIFISSID, PASSWORD);
  antares.setMqttServer();
}

void loop()
{
  // put your main code here, to run repeatedly:
  antares.checkMqttConnection();
  int temp = random(25, 30);
  int hum = random(75, 90);
  antares.add("temperature", temp);
  antares.add("humidity", hum);

  antares.publish(projectName, deviceName);
  delay(5000);
}