import React from "react";
import ShowImage from "../ShowImage";
import styles from "../styles.module.css";
import { Row, Col, Button, notification } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addProductoToBuy, addToPayment } from "../../storeRedux/actions/index";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  let shoppingCart = useSelector(state => state.shoppingCartReducer);

  function openNotification(status) {
    if (status === "error") {
      notification[status]({
        message: "Error al agregar al carrito",
        description:
          "Ya no hay productos en existencia, todos se agregaron al carrito",
        duration: 3
      });
    } else {
      notification[status]({
        message: "Producto agregado al carrito",
        duration: 3
      });
    }
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
          openNotification("error");
        } else {
          dispatch(addProductoToBuy(element));
          dispatch(addToPayment(element.price));
          openNotification("info");
        }
      } else {
        dispatch(addProductoToBuy(element));
        dispatch(addToPayment(element.price));
        openNotification("info");
      }
    } else {
      dispatch(addProductoToBuy(element));
      dispatch(addToPayment(element.price));
      openNotification("info");
    }
  }

  return (
    <div className={styles.wrapper}>
      <Row className={styles.goLeft}>
        <Col span={24} push={12}>
          <ShowImage item={product} url="product" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <h1>{product.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <p className={styles.overf}>{product.description}</p>
        </Col>
      </Row>
      <Row>
        <Col span={12} push={3}>
          <p>{product.price}$</p>
        </Col>
        <Col span={12} pull={1}>
          <Button
            onClick={() => addProduct(product)}
            type="primary"
            shape="round"
            icon="shopping-cart"
            disabled={product.quantity === 0}
          >
            {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCard;
