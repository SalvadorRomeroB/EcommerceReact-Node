import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/privateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import addCategory from "./admin/AddCategory";
import addProduct from "./admin/AddProduct";
import Carrito from "./core/Carrito";
import { useDispatch } from "react-redux";
import { listProducts, listCategories } from "../src/storeRedux/actions/index";
import axios from "axios";
import "./App.css";

function Routes() {
  const [products, setProducts] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const dispatch = useDispatch();

  const fetchData = async (link, hook) => {
    const result = await axios(link);
    hook(result.data);
  };

  React.useEffect(() => {
    fetchData("/api/products", setProducts);
    fetchData("/api/categories/", setCategories);
  }, []);

  const productsInStore = () => {
    dispatch(listProducts(products));
    dispatch(listCategories(categories));
  };

  productsInStore();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/carrito" exact component={Carrito} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={addCategory} />
        <AdminRoute path="/create/product" exact component={addProduct} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
