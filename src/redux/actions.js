import { ADD_ISOLINE, ADD_LOCATION } from "./actionTypes";
export const addIsoline = isoline => {
  return {
    type: ADD_ISOLINE,
    payload: {
      isoline
    }
  };
};

export const addLocation = location => {
  return {
    type: ADD_LOCATION,
    payload: {
      location
    }
  };
};
