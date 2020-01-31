import { ADD_ISOLINE, ADD_LOCATION, ADD_RANGE } from "./actionTypes";
export const addIsoline = isoline => {
  return {
    type: ADD_ISOLINE,
    payload: {
      isoline
    }
  };
};
export const addRange = range => {
  return {
    type: ADD_RANGE,
    payload: {
      range
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
