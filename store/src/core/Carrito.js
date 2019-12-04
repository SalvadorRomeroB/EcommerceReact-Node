import React from "react";
import PageLayout from "./Layout";
import { useSelector } from "react-redux";
import { Button, Row, Col, notification, Icon } from "antd";
import { useDispatch } from "react-redux";
import {
  editQuantityInCart,
  addToPayment,
  removeInPayment,
  deleteItem
} from "../storeRedux/actions/index";
import StripeCheckOut from "react-stripe-checkout";
import axios from "axios";

function Carrito() {
  const dispatch = useDispatch();
  let shoppingCart = useSelector(state => state.shoppingCartReducer);
  let total = useSelector(state => state.totalPaymentReducer);

  function deleteProductInCart(producto) {
    shoppingCart.forEach(element => {
      if (element.producto._id === producto._id) {
        if (element.cantidad === 0) {
          dispatch(deleteItem(producto._id));
        }
      }
    });
  }

  function deleteItemFromCart(item, numberOfItems) {
    for (let i = 0; i < numberOfItems; i++) {
      modifyItemInCart(item.producto, -1);
    }
  }

  function modifyItemInCart(producto, cantidad) {
    dispatch(editQuantityInCart(producto._id, cantidad));
    if (cantidad > 0) {
      dispatch(addToPayment(producto.price));
    } else {
      dispatch(removeInPayment(producto.price));
    }
    deleteProductInCart(producto);
  }

  function openNotification(status) {
    if (status === "success") {
      notification["success"]({
        message: "Tu compra fue exitosa",
        description:
          "Revisa tu bandeja de entrada para los detalles de tu compra",
        duration: 8
      });
    } else {
      notification["error"]({
        message: "Error al momento de la transaccion",
        description:
          "Tu compra no se pudo realizar, ponte en contacto con tu banco",
        duration: 8
      });
    }
  }

  async function handleToken(token) {
    const response = await axios.post("/checkout", {
      token,
      total
    });
    const { status } = response.data;
    if (status === "success") {
      openNotification("success");
    } else {
      openNotification("error");
    }
  }

  return (
    <PageLayout title="Shopping Cart" description="This is your Shopping Cart">
      {shoppingCart.length > 0 ? (
        <div>
          <div>
            <Row>
              <Col span={8}>Producto</Col>
              <Col span={8}>Cantidad</Col>
            </Row>
          </div>
          <div>
            {shoppingCart.map(product => (
              <Row key={product.producto._id} style={{ paddingBottom: "2em" }}>
                <Col span={8}>{product.producto.name}</Col>
                <Col span={8}>
                  {product.cantidad > 0 ? (
                    <Button
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        modifyItemInCart(product.producto, -1);
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
                        modifyItemInCart(product.producto, 1);
                      }}
                    >
                      +
                    </Button>
                  ) : null}
                </Col>
                <Col span={8}>
                  <Icon
                    type="delete"
                    onClick={() => {
                      deleteItemFromCart(product, product.cantidad);
                    }}
                  />
                </Col>
              </Row>
            ))}
          </div>
          <StripeCheckOut
            stripeKey="pk_test_TCQmQyxk0AElfsk1X7DMLNT300u76mDQm9"
            token={handleToken}
            billingAddress
            shippingAddress
            amount={total * 100}
          />
        </div>
      ) : (
        <h1>Your Shopping Cart is empty.</h1>
      )}
    </PageLayout>
  );
}

export default Carrito;
