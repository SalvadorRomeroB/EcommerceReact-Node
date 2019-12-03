import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./storeRedux/reducers/index";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
