import productsReducer from "./products";
import categoryReducer from "./categories";
import shoppingCartReducer from "./shoppingCart";
import totalPaymentReducer from "./totalPayment";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  productsReducer,
  categoryReducer,
  shoppingCartReducer,
  totalPaymentReducer
});

export default allReducers;
