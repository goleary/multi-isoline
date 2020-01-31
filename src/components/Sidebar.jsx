import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
  makeStyles
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import AddLocationDialog from "./AddLocationDialog";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    width: "200px",
    top: 0,
    left: 0,
    background: "white",
    margin: "10px"
  }
}));
export default function Sidebar() {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const addLocation = location => setLocations([...locations, location]);
  return (
    <List className={classes.root}>
      <ListSubheader>Locations</ListSubheader>
      {locations.map(l => (
        <ListItem>{l.name}</ListItem>
      ))}
      <ListItem button onClick={() => setDialogOpen(true)}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add One" />
      </ListItem>
      <AddLocationDialog dialogOpen={dialogOpen} setPlace={addLocation} />
      <ListSubheader>Isolines</ListSubheader>
      <ListItem>60 min</ListItem>
      <ListItem>
        <TextField label="test" variant="outlined" type="number" />
      </ListItem>
    </List>
  );
}
