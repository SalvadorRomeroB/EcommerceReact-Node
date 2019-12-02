import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import productsReducer from "./products";
import categoryReducer from "./categories";
import shoppingCartReducer from "./shoppingCart";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counterReducer,
  loggedReducer,
  productsReducer,
  categoryReducer,
  shoppingCartReducer
});

export default allReducers;
