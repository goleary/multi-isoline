import union from "lodash/union";
import { ADD_ISOLINE } from "../actionTypes";

const initialState = [60];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ISOLINE: {
      const { isoline } = action.payload;
      return union(state, [isoline]);
    }
    default:
      return state;
  }
}
