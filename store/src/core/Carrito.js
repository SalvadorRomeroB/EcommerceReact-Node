import React from "react";
import PageLayout from "./Layout";
import { useSelector } from "react-redux";
import { Button, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { editQuantityInCart } from "../storeRedux/actions/index";
import StripeCheckOut from "react-stripe-checkout";
import axios from "axios";

function Carrito() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCartReducer);

  function modifyQuantity(id, cantidad) {
    dispatch(editQuantityInCart(id, cantidad));
  }

  async function handleToken(token) {
    const response = await axios.post("/checkout", {
      token
    });
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
    } else {
    }
  }

  return (
    <PageLayout title="Shopping Cart" description="This is your Shopping Cart">
      {shoppingCart.length > 0 ? (
        <div>
          <div>
            <Row>
              <Col span={12}>Producto</Col>
              <Col span={12}>Cantidad</Col>
            </Row>
          </div>
          <div>
            {shoppingCart.map(product => (
              <Row key={product.producto._id} style={{ paddingBottom: "2em" }}>
                <Col span={12}>{product.producto.name}</Col>
                <Col span={12}>
                  {product.cantidad > 0 ? (
                    <Button
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        modifyQuantity(product.producto._id, -1);
                      }}
                    >
                      -
                    </Button>
                  ) : null}

                  {product.cantidad}
                  {product.cantidad < product.producto.quantity ? (
                    <Button
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        modifyQuantity(product.producto._id, 1);
                      }}
                    >
                      +
                    </Button>
                  ) : null}
                </Col>
              </Row>
            ))}
          </div>
        </div>
      ) : (
        <h1>Your Shopping Cart is empty.</h1>
      )}
      <StripeCheckOut
        stripeKey="pk_test_TCQmQyxk0AElfsk1X7DMLNT300u76mDQm9"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={100 * 100}
      />
    </PageLayout>
  );
}

export default Carrito;
