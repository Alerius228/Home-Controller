#[macro_use] extern crate rocket;

use rocket_cors::{AllowedHeaders, AllowedOrigins, CorsOptions};

mod routes;
mod data_structures;
mod dtos;

use data_structures::room_data::RoomData;
use routes::{hello_world, submit_info, get_info};

#[launch]
fn rocket() -> _ {
    let cors = CorsOptions::default()
        .allow_credentials(true)
        .to_cors()
        .expect("CORS config error");

    rocket::build()
    .manage(RoomData::new())
    .attach(cors)
    .mount("/", routes![hello_world::index])
    .mount("/", routes![submit_info::submit])
    .mount("/", routes![get_info::get_info])
}