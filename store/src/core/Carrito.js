import React from "react";
import PageLayout from "./Layout";
import { useSelector } from "react-redux";
import { Button, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { editQuantityInCart } from "../storeRedux/actions/index";

function Carrito() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCartReducer);

  function modifyQuantity(id, cantidad) {
    dispatch(editQuantityInCart(id, cantidad));
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
          <Button>Comprar</Button>
        </div>
      ) : (
        <h1>Your Shopping Cart is empty.</h1>
      )}
    </PageLayout>
  );
}

export default Carrito;
