use rocket::get;
use rocket::serde::json::Json;
use rocket::State;
use crate::dtos::room_data_req_dto::RoomDataReqDto;

use crate::data_structures::room_data::RoomData;

#[get("/getInfo")]
pub fn get_info(room_data: &State<RoomData>) -> Json<RoomDataReqDto> {
    return Json(RoomDataReqDto{temperature: room_data.get_temperature(), humidity: room_data.get_humidity(), luminosity: room_data.get_luminosity()});
}