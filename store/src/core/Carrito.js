import React from "react";
import PageLayout from "./Layout";
import { useSelector } from "react-redux";
import { Button, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { addProductoToBuy } from "../storeRedux/actions/index";

function Carrito() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(state => state.shoppingCartReducer);

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
                  <Button style={{ marginRight: "10px" }}>-</Button>
                  {product.cantidad}
                  <Button style={{ marginLeft: "10px" }}>+</Button>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      ) : (
        <h1>Your Shopping Cart is empty.</h1>
      )}
    </PageLayout>
  );
}

export default Carrito;
