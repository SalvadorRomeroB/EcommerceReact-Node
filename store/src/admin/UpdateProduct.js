import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";
import styles from "./styles.module.css";
import { Form, Button, Row, Col, Icon, message } from "antd";

const key = "updatable";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    success: false,
    error: ""
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    quantity,
    error,
    formData,
    success
  } = values;

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  const init = productId => {
    getProduct(productId).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          categories: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          FormData: new FormData()
        });
        initCategories();
      }
    });
  };

  useEffect(() => {
    init(match.params.productId);
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            createdProduct: data.name,
            error: "",
            success: true
          });
        }
      }
    );
  };

  const updateForm = () => (
    <div>
      <Row className={styles.box}>
        {showSuccess()}
        {showError()}
        <Col lg={2} />
        <Col xs={20} lg={24}>
          <Form onSubmit={clickSubmit}>
            {/* Change Name */}
            <label className={styles.labelStyle}>Name:</label>
            <Form.Item>
              <input
                className={styles.inpFormat}
                type="text"
                placeholder="Add product name"
                onChange={handleChange("name")}
                value={name}
                autoFocus
                required
              />
            </Form.Item>
            {/* Change Description */}
            <label className={styles.labelStyle}>Description:</label>
            <Form.Item>
              <textarea
                className={styles.inpFormat}
                placeholder="Enter description of the product"
                onChange={handleChange("description")}
                autoSize={{ minRows: 2, maxRows: 6 }}
                value={description}
              />
            </Form.Item>
            <Row>
              <label className={styles.labelStyle}>Photo:</label>

              <Col lg={24}>
                {/* Change photo */}
                <Form.Item>
                  <div
                    className={`${styles.uploadBtnWrapper} ${styles.inpFileFormat}`}
                  >
                    <input
                      type="file"
                      onChange={handleChange("photo")}
                      name="photo"
                      accept="image/*"
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col lg={24}>
                {/* Change Price */}
                <label className={styles.labelStyle}>Price:</label>
                <Form.Item>
                  <input
                    className={styles.inpFormat}
                    type="number"
                    min="10"
                    onChange={handleChange("price")}
                    value={price}
                    placeholder="  Price"
                  />
                </Form.Item>
              </Col>
              <Col lg={24}>
                {/* Change quantity */}
                <label className={styles.labelStyle}>Quantity:</label>

                <Form.Item>
                  <input
                    className={styles.inpFormat}
                    placeholder="  Quantity"
                    min="1"
                    type="number"
                    onChange={handleChange("quantity")}
                    value={quantity}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Row>
                <Col span={12}>
                  <Form.Item>
                    {/* Change Category */}
                    <select
                      onChange={handleChange("category")}
                      className={styles.selectFormat}
                    >
                      <option>Select Category</option>
                      {categories &&
                        categories.map((c, i) => (
                          <option key={i} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <select
                      onChange={handleChange("shipping")}
                      className={styles.selectFormat}
                    >
                      <option>Shipping</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </Form.Item>
                </Col>
              </Row>
            </Row>
            {/* Change shipping */}

            <Form.Item>
              <Row>
                <Col span={24}>
                  <Button
                    className={styles.btnStyle}
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    size="large"
                  >
                    Create Product
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
        <Col lg={2} />
      </Row>
    </div>
  );

  const showSuccess = () => {
    if (success) {
      if (!error) {
        const successMessage = `Product has been updated succesfully`;
        message.success({
          content: successMessage,
          key,
          duration: 2
        });
        return <Redirect to="/admin/products" />;
      }
    }
  };

  const showError = () => {
    if (error) {
      message.error({
        content: "Could not add category",
        key,
        duration: 2
      });
    }
  };

  return <Layout title="Update product">{updateForm()}</Layout>;
};

export default UpdateProduct;
