#include <DHT11.h>
#include <LiquidCrystal.h>

#define DHT_CHECK_PERIOD 10000
#define FAN_SWITCH_PERIOD 600000
#define TEMP_SWITCH_VALUE 27

int optocoupler = 12;
int photo_resistor = A1;
int relay_fan = 4;

int currentStateLED = 0;

int temperature = 0;
int humidity = 0;

DHT11 dht11(11);
LiquidCrystal lcd(10, 9, 8, 7, 6, 5);

void infoDisplay()

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);  // Initialize 16x2 LCD

  pinMode(photo_resistor, INPUT);
  pinMode(optocoupler, OUTPUT);
  
  pinMode(relay_fan, OUTPUT);

  lcd.setCursor(0, 0);
  lcd.print("%Humid%  Temp(C)");
}

void loop() {
  int light = analogRead(photo_resistor);

  int currentTime = millis();

  if ( light <= 80 && ( currentStateLED == 2 || currentStateLED == 0) ){
    delay(100);
    digitalWrite(optocoupler, HIGH);
    delay(15);
    digitalWrite(optocoupler, LOW);
    currentStateLED = 1;
  }
  
  else if ( light >= 100 && (currentStateLED == 1 || currentStateLED == 0) ){
    delay(100);
    digitalWrite(optocoupler, HIGH);
    delay(15);
    digitalWrite(optocoupler, LOW);
    currentStateLED = 2;
  }

//Current time depends on the timing of the nano itself. 100ms delay is used to prevent double checking and give more time for the arduino to respond.
  if ( currentTime % DHT_CHECK_PERIOD > 0 && currentTime % DHT_CHECK_PERIOD < 100 ) {
    int result = dht11.readTemperatureHumidity(temperature, humidity);
    delay(100);

    if (temperature >= TEMP_SWITCH_VALUE && currentTime % FAN_PERIOD > 0 && currentTime % FAN_PERIOD < 100 )
      digitalWrite(relay_fan, HIGH);
    else if (temperature < TEMP_SWITCH_VALUE
    && currentTime % FAN_PERIOD > 0 && currentTime % FAN_PERIOD < 100)
      digitalWrite(relay_fan, LOW);
  }
  
  infoDisplay();
}

void infoDisplay(){
  lcd.setCursor(0, 1);
  lcd.print(humidity);
  lcd.print("       ");
  lcd.print(temperature);
}
