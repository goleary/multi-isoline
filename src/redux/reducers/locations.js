import { ADD_LOCATION } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_LOCATION: {
      const { location } = action.payload;
      return [...state, location];
    }
    default:
      return state;
  }
}
