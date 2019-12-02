import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import productsReducer from "./products";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counterReducer,
  loggedReducer,
  productsReducer
});

export default allReducers;
