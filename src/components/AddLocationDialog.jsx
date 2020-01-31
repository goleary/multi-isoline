import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addLocation } from "../redux/actions";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

import PlacesAutocomplete from "./PlacesAutocomplete";
const AddLocationDialog = ({ dialogOpen, addLocation, done }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(dialogOpen), [dialogOpen]);

  return (
    <Dialog open={open} onClose={done} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add a location</DialogTitle>
      <DialogContent>
        <PlacesAutocomplete
          setPlace={place => {
            addLocation(place);
            done();
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={done} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = { addLocation };

export default connect(null, mapDispatchToProps)(AddLocationDialog);
