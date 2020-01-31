import { combineReducers } from "redux";

import locations from "./locations";
import isolines from "./isolines";

export default combineReducers({
  locations,
  isolines
});
