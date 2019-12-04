import React from "react";
import PageLayout from "./Layout";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { addProductoToBuy, addToPayment } from "../storeRedux/actions/index";

function Home() {
  const dispatch = useDispatch();
  const productsList = useSelector(state => state.productsReducer);

  function addProduct(id) {
    productsList.forEach(element => {
      if (element._id === id) {
        dispatch(addProductoToBuy(element));
        dispatch(addToPayment(element.price));
      }
    });
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
              onClick={() => addProduct(product._id)}
            >
              Comprar
            </Button>
          </div>
        ))}
      </ul>
    </PageLayout>
  );
}

export default Home;
