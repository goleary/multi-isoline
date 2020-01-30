import React, { useState, useEffect } from "react";
import "./App.css";

import { hereIsolineUrl } from "./services/here";

import MapContainer from "./components/MapContainer";
import Sidebar from "./components/Sidebar";
function App() {
  const color = "#5DDCCF";
  const [shape, setShape] = useState([]);
  const [center, setCenter] = useState([47.605779, -122.315744]);
  const mode = "car";
  const range = 1000;
  const type = "time";
  const traffic = false;
  const [zoom, setZoom] = useState(12);
/*
  useEffect(() => {
    //could convert this to async function
    const updateIsoline = () => {
      fetch(hereIsolineUrl({ mode, traffic, center, range, type }))
        .then(res => res.json())
        .then(res => {
          if (res.response.isoline[0].component.length > 0) {
            const shape = res.response.isoline[0].component[0].shape.map(x => [
              x.split(",")[0],
              x.split(",")[1]
            ]);
            setShape(shape);
          } else {
            const shape = [];
            setShape(shape);
          }
        });
    };
    updateIsoline();
  }, [center]);
*/
  return (
    <div className="App">
      <MapContainer
        color={color}
        isoline={shape}
        center={center}
        zoom={zoom}
        handleMapMove={setZoom}
        handleMarkerDrag={setCenter}
      />
    </div>
  );
}

export default App;
