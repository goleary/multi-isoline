import { combineReducers } from "redux";

import locations from "./locations";
import isolines from "./isolines";
import ranges from "./ranges";

export default combineReducers({
  locations,
  isolines,
  ranges
});
