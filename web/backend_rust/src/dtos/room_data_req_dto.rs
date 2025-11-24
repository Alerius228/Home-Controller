use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct RoomDataReqDto {
    pub temperature: u16,
    pub humidity: u16,
    pub luminosity: u16,
}

