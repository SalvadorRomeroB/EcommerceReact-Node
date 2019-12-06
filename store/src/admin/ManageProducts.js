import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { getProducts, deleteProduct } from "./apiAdmin";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import styles from "./styles.module.css";
import { Button, Row, Col, message, List, Card } from "antd";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then(data => {
      if (data.error) {
      } else {
        setProducts(data);
      }
    });
  };

  const remove = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description={`There are ${products.length} products`}
    >
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Row gutter={16}>
          {products.map((p, i) => (
            <Col xs={24} lg={8} key={i} className={styles.cardsFormat}>
              <Card title={p.name} bordered={false}>
                <Link to={`/admin/product/update/${p._id}`}> Update </Link>
                <Button
                  icon="delete"
                  shape="circle"
                  onClick={() => remove(p._id)}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default ManageProducts;
