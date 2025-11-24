import type RoomData from "../data_structures/RoomData";

export default async function setInfoService(): Promise<RoomData> {
  let response = await fetch("http://10.50.78.220:8000/getInfo", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const info: any = await response.json();
  const data: RoomData = {
    temperature: info.temperature,
    humidity: info.humidity,
    luminosity: info.luminosity,
  };

  return data;
}
