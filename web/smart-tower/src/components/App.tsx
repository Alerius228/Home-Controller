import Header from "./Header";
import InfoBox from "./InfoBox";
import { useState, useEffect } from "react";
import "../css/App.css";
import * as THREE from "three";
import DOTS from "vanta/dist/vanta.dots.min.js";
import TOPOLOGY from "vanta/dist/vanta.topology.min.js";
import p5 from "p5";

// useState is used to sync info with the external database. temperature is the one being monitored and setTemperature is the function to update it
// useEffect is used to perform updated to the component after a set amount of time or when a specific event occurs
// useState returns an array with two elements: the current state value and a function to update it. (0 is the default value)

function App() {
  const [temperature, _setTemperature] = useState(0);
  const [humidity, _setHumidity] = useState(10);
  const [luminosity, _setLuminosity] = useState(70);
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
          mouseControls: false, // 🚫 ignore mouse
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00ffff,
          backgroundColor: 0x111111,
          speed: 2,
          zindex: -1,
        });

        mounted = true;
      } catch (err) {
        console.warn("Vanta failed to load:", err);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (mounted) return;
  //   else {
  //     try {
  //       DOTS({
  //         el: "#appBackground",
  //         THREE,
  //         mouseControls: true,
  //         touchControls: true,
  //         gyroControls: false,
  //         minHeight: 200.0,
  //         minWidth: 200.0,
  //         scale: 1.0,
  //         scaleMobile: 1.0,
  //         color: 0x00ffff,
  //         backgroundColor: 0x222222,
  //       });
  //       mounted = true;
  //     } catch (err) {
  //       console.warn("Vanta failed to load:", err);
  //     }
  //   }
  // }, []);

  // //NOT WORKING YET
  // useEffect(() => {
  //   // Function to get new sensor data from the database
  //   async function updateSensorData() {
  //     // const newTemperature: number = await getTemperature(); //create service
  //     // const newHumidity: number = await getHumidity(); //create service
  //     // setTemperature(newTemperature);
  //     // setHumidity(newHumidity);
  //   }
  //   // Update immediately on mount
  //   updateSensorData();
  //   // Set up interval
  //   const interval = setInterval(updateSensorData, 60000); // every minute
  //   // Cleanup on unmount
  //   return () => clearInterval(interval);
  // }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="app">
      <Header />
      <div id="appBackground" className="appBackground"></div>
      <div className="infoBoxContainer">
        <InfoBox infoName="Temperature" value={temperature} />
        <InfoBox infoName="Humidity" value={humidity} />
        <InfoBox infoName="Luminosity" value={luminosity} />
      </div>
    </div>
  );
}

export default App;
