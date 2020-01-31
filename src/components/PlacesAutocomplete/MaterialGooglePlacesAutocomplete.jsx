// this is adapted from 'react-google-autocomplete' npm package
// I changed it to a function component that makes use of hooks
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import Textfield from "@material-ui/core/Textfield";

function loadScript(src, position, id, setLoaded) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  script.addEventListener("load", setLoaded);
  position.appendChild(script);
}

export default ({ ...props }) => {
  const propTypes = {
    onPlaceSelected: PropTypes.func,
    types: PropTypes.array,
    componentRestrictions: PropTypes.object,
    bounds: PropTypes.object,
    fields: PropTypes.array
  };

  const inputRef = useRef(null);

  let autocomplete = null;
  let event = null;

  const [loaded, setLoaded] = useState(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyA26CwIAVe2RnPbj6C5qEQCac7I6cgsrNU&libraries=places",
        document.querySelector("head"),
        "google-maps",
        () => {
          setLoaded(true);
        }
      );
    }
  }

  useEffect(() => {
    if (!loaded) return;
    const {
      types = ["(cities)"],
      componentRestrictions,
      bounds,
      fields = [
        "address_components",
        "geometry.location",
        "place_id",
        "formatted_address"
      ]
    } = props;
    const config = {
      types,
      bounds,
      fields
    };

    if (componentRestrictions) {
      config.componentRestrictions = componentRestrictions;
    }

    autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      config
    );

    event = autocomplete.addListener("place_changed", onSelected);
    return () => event && event.remove();
  }, [loaded]);

  const onSelected = () => {
    if (props.onPlaceSelected && autocomplete) {
      props.onPlaceSelected(autocomplete.getPlace(), inputRef.current);
    }
  };
  const {
    onPlaceSelected,
    types,
    componentRestrictions,
    bounds,
    disabled,
    ...rest
  } = props;
  return (
    <Textfield
      variant={disabled ? "filled" : "outlined"}
      inputRef={inputRef}
      {...rest}
    />
  );
};
