use rocket::State;
use crate::data_structures::room_data::RoomData;
use crate::dtos::room_data_req_dto::RoomDataReqDto;
use rocket::response::status;

use rocket::post;
use rocket::serde::json::Json;

// Make it more secure. RSA public key encryption?
#[post("/submit", data="<data>")]
pub fn submit(data: Json<RoomDataReqDto>, room_data: &State<RoomData>) -> status::Accepted<String> {
    println!("Received data:
    \n Temperature: {:?}
    \n Humidity: {:?}
    \n Luminosity: {:?}", data.temperature, data.humidity, data.luminosity);

    room_data.set_values([data.temperature, data.humidity, data.luminosity]);

    status::Accepted("Data submitted successfully".to_string())
}