import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ReactGoogleAutocomplete from "./MaterialGooglePlacesAutocomplete";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    "justify-content": "flex-start",
    "align-items": "center",
    width: "100%"
  },
  autocomplete: {
    width: "100%",
    margin: "10px 0"
  },
  buttonContainer: {
    padding: "0 5px 0"
  }
}));

export default function PlacesAutocomplete({
  includePhotos,
  name,
  disabled,
  id,
  setPlace,
  children
}) {
  const classes = useStyles();

  const getFields = () => {
    const defaultFields = ["formatted_address", "name", "geometry.location"];
    if (includePhotos) {
      return [...defaultFields, "photos"];
    } else {
      return defaultFields;
    }
  };
  return (
    <div className={classes.container}>
      <ReactGoogleAutocomplete
        className={classes.autocomplete}
        disabled={disabled}
        fields={getFields()}
        id={id}
        onPlaceSelected={place => {
          if (place.formatted_address) {
            setPlace(place);
          }
        }}
        label={name}
        types={[]}
      />
      <div className={classes.buttonContainer}>{children}</div>
    </div>
  );
}
