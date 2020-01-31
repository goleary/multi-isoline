import union from "lodash/union";
import { ADD_RANGE } from "../actionTypes";

const initialState = [10];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_RANGE: {
      const { range } = action.payload;
      return union(state, [range]);
    }
    default:
      return state;
  }
}
