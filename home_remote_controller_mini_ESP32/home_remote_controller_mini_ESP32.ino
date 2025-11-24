#include <DHT11.h>
#include <LiquidCrystal.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "esp_eap_client.h"

#define DHT_CHECK_PERIOD 60000
#define FAN_SWITCH_PERIOD 600000
#define TEMP_SWITCH_VALUE 27

const int optocoupler = 18;
const int photo_resistor = 32;

//int relay_fan = 4;

//currentState 0 = 1st loop; 1 = dark; 2 = light. 
int currentStateLED = 0;

int temperature = 0;
int humidity = 0;

DHT11 dht11(19);
LiquidCrystal lcd(21, 22, 23, 25, 26, 27);

void infoDisplay();

void setup() {
  Serial.begin(9600);
  
  WiFi.disconnect(true);
  WiFi.mode(WIFI_STA);    //init wifi mode
  esp_eap_client_set_identity((uint8_t *)USERNAME, strlen(USERNAME));  //provide identity
  esp_eap_client_set_username((uint8_t *)USERNAME, strlen(USERNAME));  //provide username
  esp_eap_client_set_password((uint8_t *)PASSWORD, strlen(PASSWORD));  //provide password
  esp_wifi_sta_enterprise_enable();
  WiFi.begin(ID);  //connect to wifi
  
  lcd.begin(16, 2); // for a 16x2 LCD
  lcd.clear();

  pinMode(photo_resistor, INPUT);
  pinMode(optocoupler, OUTPUT);
  digitalWrite(optocoupler, LOW); // start off
  
//  pinMode(relay_fan, OUTPUT);

  lcd.setCursor(0, 0);
  lcd.print("%Humid%  Temp(C)");
}

void loop() {
  int light = analogRead(photo_resistor) * 100 / 4093;
  
  int currentTime = millis();

  if ( light <= 20 && ( currentStateLED == 2 || currentStateLED == 0) ){
    delay(100);
    digitalWrite(optocoupler, HIGH);
    delay(15);
    digitalWrite(optocoupler, LOW);
    currentStateLED = 1;
  }
  
  else if ( light >= 30 && (currentStateLED == 1 || currentStateLED == 0) ){
    delay(100);
    digitalWrite(optocoupler, HIGH);
    delay(15);
    digitalWrite(optocoupler, LOW);
    currentStateLED = 2;
  }

//Current time depends on the timing of the nano itself. Exact comparisons will not work. A 100 milliseconds interval is used. dealy is used to eliminate double checking.
  if ( currentTime % DHT_CHECK_PERIOD > 0 && currentTime % DHT_CHECK_PERIOD < 100 ) {
    int result = dht11.readTemperatureHumidity(temperature, humidity);
    delay(100);

    StaticJsonDocument<200> roomInfo;
    HTTPClient http;

    roomInfo["temperature"] = temperature;
    roomInfo["humidity"] = humidity;
    roomInfo["luminosity"] = int(light);

    String jsonString;
    serializeJson(roomInfo, jsonString);
    
    http.begin(SERVERNAME);

    http.addHeader("Content-Type", "application/json");

    int response = http.POST(jsonString);
    Serial.println(response);
    
//    if (temperature >= TEMP_SWITCH_VALUE && currentTime % FAN_PERIOD > 0 && currentTime % FAN_PERIOD < 100 )
//      digitalWrite(relay_fan, HIGH);
//    else if (temperature < TEMP_SWITCH_VALUE
//    && currentTime % FAN_PERIOD > 0 && currentTime % FAN_PERIOD < 100)
//      digitalWrite(relay_fan, LOW);
  }

  infoDisplay();
}

void infoDisplay(){
  lcd.setCursor(0, 1);
  lcd.print(humidity);
  lcd.setCursor(9,1);
  lcd.print(temperature);
}
