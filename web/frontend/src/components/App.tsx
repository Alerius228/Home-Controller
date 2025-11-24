import Header from "./Header";
import InfoBox from "./InfoBox";
import { useState, useEffect } from "react";
import "../css/App.css";
import * as THREE from "three";
import TOPOLOGY from "vanta/dist/vanta.topology.min.js";
import p5 from "p5";
import type RoomData from "../data_structures/RoomData";

// useState is used to sync info with the external database. temperature is the one being monitored and setTemperature is the function to update it
// useEffect is used to perform updated to the component after a set amount of time or when a specific event occurs
// useState returns an array with two elements: the current state value and a function to update it. (0 is the default value)

function App() {
  const [roomInfo, setRoomInfo] = useState({
    temperature: 0,
    humidity: 0,
    luminosity: 0,
  });

  useEffect(() => {
    async function updateSensorData() {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data: RoomData = await response.json();
      console.log("Sensor data updated:", data);
      setRoomInfo({
        temperature: data.temperature,
        humidity: data.humidity,
        luminosity: data.luminosity,
      });
    }

    // Update immediately on mount
    updateSensorData();
    const interval = setInterval(updateSensorData, 5000); // run every 5s

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  let mounted = false;

  useEffect(() => {
    if (mounted) return;
    else {
      try {
        TOPOLOGY({
          el: "#appBackground",
          THREE: THREE,
          p5: p5,
          position: "absolute",
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00ffff,
          backgroundColor: 0x111111,
          zindex: -1,
        });

        mounted = true;
      } catch (err) {
        console.warn("Vanta failed to load:", err);
      }
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <div id="appBackground" className="appBackground"></div>
      <div className="infoBoxContainer">
        <InfoBox infoName="Temperature" value={roomInfo.temperature + "°C"} />
        <InfoBox infoName="Humidity" value={roomInfo.humidity + "%"} />
        <InfoBox infoName="Luminosity" value={roomInfo.luminosity + "%"} />
      </div>
    </div>
  );
}

export default App;
