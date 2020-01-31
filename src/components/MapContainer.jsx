import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Map, TileLayer, Marker, Polygon } from "react-leaflet";
import { hereIsolineUrl, hereTileUrl } from "../services/here";

const MapContainer = ({
  center,
  color,
  locations,
  isolines,
  handleMapMove,
  zoom
}) => {
  const map = useRef();
  const [shape, setShape] = useState([]);
  handleMapMove = () => {
    const zoom = map.current.viewport.zoom;
    handleMapMove(zoom);
  };
  const defaultOptions = { mode: "car", traffic: false, type: "time" };

  ///should probably useMemo to avoid recomputing old isolines
  useEffect(() => {
    const fetchIsolines = () => {
      fetch(
        hereIsolineUrl({
          ...defaultOptions,
          place: locations[0],
          range: isolines[0]
        })
      )
        .then(res => res.json())
        .then(res => {
          if (res.response.isoline[0].component.length > 0) {
            const temp = res.response.isoline[0].component[0].shape.map(x => [
              x.split(",")[0],
              x.split(",")[1]
            ]);
            setShape(temp);
          } else {
            setShape([]);
          }
        });
    };
    if (locations[0] && isolines[0]) fetchIsolines();
  }, [locations, isolines]);

  return (
    <div className="map">
      <Map
        center={center}
        zoom={zoom}
        zoomControl={false}
        attributionControl={false}
        onMoveend={handleMapMove}
        ref={map}
      >
        <TileLayer url={hereTileUrl("reduced.night")} />
        {locations.map((l, index) => (
          <Marker
            key={index}
            position={[l.geometry.location.lat(), l.geometry.location.lng()]}
          />
        ))}
        <Polygon fillOpacity={0.1} weight={2} positions={shape} color={color} />
      </Map>
    </div>
  );
};
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    locations: state.locations,
    isolines: state.isolines
  };
};

export default connect(mapStateToProps)(MapContainer);
