import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default store;
