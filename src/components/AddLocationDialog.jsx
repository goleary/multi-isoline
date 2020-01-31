import React, { useState, useEffect } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

import PlacesAutocomplete from "./PlacesAutocomplete";
export default function AddLocationDialog({ dialogOpen, setPlace }) {
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
            setPlace(place);
            handleClose();
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
}
