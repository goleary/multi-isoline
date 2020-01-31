import union from "lodash/union";
import without from "lodash/without";
import { ADD_RANGE, REMOVE_RANGE } from "../actionTypes";

const initialState = [10];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_RANGE: {
      const { range } = action.payload;
      return union(state, [range]);
    }
    case REMOVE_RANGE: {
      const { range } = action.payload;
      return without(state, range);
    }
    default:
      return state;
  }
}
