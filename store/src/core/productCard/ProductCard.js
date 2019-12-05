import React from "react";
import ShowImage from "../ShowImage";
import styles from "../styles.module.css";
import { Row, Col, Button } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addProductoToBuy } from "../../storeRedux/actions/index";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const productsList = useSelector(state => state.productsReducer);

  const addToCart = id => {
    productsList.forEach(element => {
      console.log(id);
      if (element._id === id) {
        dispatch(addProductoToBuy(element));
      }
    });
  };

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
            onClick={() => addToCart(product._id)}
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
