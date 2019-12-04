import React, { useState, useEffect } from "react";
import PageLayout from "./Layout";
import { useSelector } from "react-redux";
import { Button, notification } from "antd";
import { useDispatch } from "react-redux";
import { addProductoToBuy, addToPayment } from "../storeRedux/actions/index";
import ProductCard from "../core/productCard/ProductCard";
import { getProducts } from "./apiCore";

function Home() {
  const dispatch = useDispatch();
  let productsList = useSelector(state => state.productsReducer);
  let shoppingCart = useSelector(state => state.shoppingCartReducer);
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  function openNotification() {
    notification.open({
      message: "Error al agregar al carrito",
      description:
        "Ya no hay productos en existencia, todos se agregaron al carrito",
      duration: 8
    });
  }

  function addProduct(element) {
    if (shoppingCart.length !== 0) {
      let found = false;
      let max = false;
      shoppingCart.forEach(product => {
        if (element._id === product.producto._id) {
          found = true;
          if (element.quantity === product.cantidad) {
            max = true;
          }
        }
      });
      if (found) {
        if (max) {
          openNotification();
        } else {
          dispatch(addProductoToBuy(element));
          dispatch(addToPayment(element.price));
        }
      } else {
        dispatch(addProductoToBuy(element));
        dispatch(addToPayment(element.price));
      }
    } else {
      dispatch(addProductoToBuy(element));
      dispatch(addToPayment(element.price));
    }
  }

  return (
    <PageLayout title="Home Page" description="This is home page">
      <ul>
        {productsList.map(product => (
          <div key={product._id} style={{ paddingBottom: "2em" }}>
            <li>{product.name}</li>
            <Button
              type="primary"
              shape="round"
              onClick={() => addProduct(product)}
            >
              Comprar
            </Button>
          </div>
        ))}
      </ul>
      {productsByArrival.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </PageLayout>
  );
}

export default Home;
