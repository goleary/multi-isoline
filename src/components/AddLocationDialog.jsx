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
const AddLocationDialog = ({ dialogOpen, addLocation }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(dialogOpen), [dialogOpen]);

  const handleClose = () => setOpen(false);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <PlacesAutocomplete
          setPlace={place => {
            addLocation(place);
            setOpen(false);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = { addLocation };

export default connect(null, mapDispatchToProps)(AddLocationDialog);
