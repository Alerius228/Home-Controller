use rocket::serde::{Serialize, Deserialize};
use std::sync::Mutex;

#[derive(Debug, Serialize, Deserialize)]
pub struct RoomData {
    pub values: Mutex<[u16; 3]>, // [temperature, humidity, luminosity]
}

impl RoomData {
    // "Constructor" in rust. Associated function.
    pub fn new() -> Self {
        Self {
            values: Mutex::new([0, 0, 0])
        }
    }

    // Getters and Setters
    pub fn get_values(&self) -> [u16; 3] {
        *self.values.lock().unwrap()
    }

    pub fn get_temperature(&self) -> u16 {
        self.values.lock().unwrap()[0]
    }

    pub fn get_humidity(&self) -> u16 {
        self.values.lock().unwrap()[1]
    }

    pub fn get_luminosity(&self) -> u16 {
        self.values.lock().unwrap()[2]
    }   

    pub fn set_values(&self, values: [u16; 3]) {
        *self.values.lock().unwrap() = values;
    }

    // UNUSED CODE
    // pub fn set_temperature(&mut self, temperature: u16) {
    //     self.values.lock().unwrap()[0] = temperature;
    // }
    // pub fn set_humidity(&mut self, humidity: u16) {
    //     self.values.lock().unwrap()[1] = humidity;
    // }
    // pub fn set_luminosity(&mut self, luminosity: u16) {
    //     self.values.lock().unwrap()[2] = luminosity;
    // }
}