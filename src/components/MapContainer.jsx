import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Map, TileLayer, Marker, Polygon } from "react-leaflet";
import { hereIsolineUrl, hereTileUrl } from "../services/here";

import { addIsoline } from "../redux/actions";

const MapContainer = ({
  addIsoline,
  center,
  color,
  locations,
  ranges,
  isolines,
  handleMapMove,
  zoom
}) => {
  const map = useRef();
  const [shape, setShape] = useState([]);
  const [polygons, setPolygons] = useState([]);
  /*
  handleMapMove = () => {
    const zoom = map.current.viewport.zoom;
    handleMapMove(zoom);
  };
  */
  const defaultOptions = { mode: "car", traffic: false, type: "time" };

  ///should probably useMemo to avoid recomputing old isolines
  useEffect(() => {
    const fetchIsoline = (place, range) =>
      fetch(
        hereIsolineUrl({
          ...defaultOptions,
          place,
          range
        })
      )
        .then(res => res.json())
        .then(res => {
          if (res.response.isoline[0].component.length > 0) {
            const shape = res.response.isoline[0].component[0].shape.map(x => [
              x.split(",")[0],
              x.split(",")[1]
            ]);
            if (shape) addIsoline(shape);
          }
        });
    for (const l of locations) {
      for (const r of ranges) {
        fetchIsoline(l, r);
      }
    }
  }, [locations, ranges]);

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
        {isolines.map((p, index) => (
          <Polygon
            key={index}
            fillOpacity={0.1}
            weight={2}
            positions={p}
            color={color}
          />
        ))}
      </Map>
    </div>
  );
};
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    locations: state.locations,
    ranges: state.ranges,
    isolines: state.isolines
  };
};

export default connect(mapStateToProps, { addIsoline })(MapContainer);
