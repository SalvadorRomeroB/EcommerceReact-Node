import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import productsReducer from "./products";
import categoryReducer from "./categories";
import shoppingCartReducer from "./shoppingCart";
import totalPaymentReducer from "./totalPayment";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counterReducer,
  loggedReducer,
  productsReducer,
  categoryReducer,
  shoppingCartReducer,
  totalPaymentReducer
});

export default allReducers;
