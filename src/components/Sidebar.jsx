import React, { useState } from "react";
import { connect } from "react-redux";

import { addRange, removeRange, removeLocation } from "../redux/actions";

import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
  makeStyles
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

import AddLocationDialog from "./AddLocationDialog";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    width: "200px",
    top: 0,
    left: 0,
    background: "white",
    margin: "10px",
    zIndex: "500"
  }
}));
const Sidebar = ({
  locations,
  ranges,
  addRange,
  removeLocation,
  removeRange
}) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isolineField, setIsolineField] = useState(60);
  return (
    <List className={classes.root}>
      <ListSubheader>Locations</ListSubheader>
      {locations.map((l, index) => (
        <ListItem key={index}>
          <ListItemText primary={l.name} />
          <IconButton onClick={() => removeLocation(l)}>
            <ClearIcon />
          </IconButton>
        </ListItem>
      ))}
      <ListItem button onClick={() => setDialogOpen(true)}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add One" />
      </ListItem>
      <AddLocationDialog
        dialogOpen={dialogOpen}
        done={() => setDialogOpen(false)}
      />
      <ListSubheader>Isolines</ListSubheader>
      {ranges.map((time, index) => (
        <ListItem key={index}>
          <ListItemText primary={time + " min"} />
          <IconButton onClick={() => removeRange(time)} aria-label="delete">
            <ClearIcon />
          </IconButton>
        </ListItem>
      ))}
      <ListItem>
        <TextField
          onChange={event => setIsolineField(event.target.value)}
          onKeyPress={ev => {
            console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === "Enter") {
              addRange(isolineField);
              // Do code here
              ev.preventDefault();
            }
          }}
          label="test"
          variant="outlined"
          type="number"
          value={isolineField}
        />
      </ListItem>
    </List>
  );
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    locations: state.locations,
    ranges: state.ranges
  };
};

export default connect(mapStateToProps, {
  addRange,
  removeRange,
  removeLocation
})(Sidebar);
