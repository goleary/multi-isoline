import union from "lodash/union";
import without from "lodash/without";

import { ADD_LOCATION, REMOVE_LOCATION } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_LOCATION: {
      const { location } = action.payload;
      return union(state, [location]);
    }
    case REMOVE_LOCATION: {
      const { location } = action.payload;
      return without(state, location);
    }
    default:
      return state;
  }
}
