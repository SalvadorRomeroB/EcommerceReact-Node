import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";
import styles from "./styles.module.css";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Alert,
  Icon,
  InputNumber,
  Select
} from "antd";

const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {
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
    formData: ""
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    quantity,
    loading,
    error,
    createdProduct,
    formData
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const newPostForm = () => (
    <div>
      <Row>
        <Col xs={{ span: 1, offset: 1 }} lg={{ span: 6, offset: 2 }} />
        {showSuccess()}
        {showError()}
        <Col xs={{ span: 18, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Form onSubmit={clickSubmit}>
            {/* Add Name */}
            <Form.Item>
              <Input
                type="text"
                placeholder="Add product name"
                onChange={handleChange("name")}
                value={name}
                autoFocus
                required
              />
            </Form.Item>
            {/* Add Description */}
            <Form.Item>
              <TextArea
                placeholder="Enter description of the product"
                onChange={handleChange("description")}
                autoSize={{ minRows: 2, maxRows: 6 }}
                value={description}
              />
            </Form.Item>
            <Row>
              <Col span={18} push={9}>
                {/* Add photo */}
                <Form.Item>
                  <div className={styles.uploadBtnWrapper}>
                    <button className={styles.btn}>
                      Choose Image
                      <Icon type="upload" />
                    </button>
                    <input
                      type="file"
                      name="myfile"
                      onChange={handleChange("photo")}
                      name="photo"
                      accept="image/*"
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col span={6} pull={18}>
                {/* Price */}
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
            </Row>
            <Row>
              <Col span={18} push={11}>
                {/* Add quantity */}
                <Form.Item>
                  <input
                    className={styles.inpFormat}
                    placeholder="  Quantity"
                    type="number"
                    onChange={handleChange("quantity")}
                    value={quantity}
                  />
                </Form.Item>
              </Col>
              <Col span={6} pull={18}>
                <Form.Item>
                  {/* Add Category */}
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
            </Row>

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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Product
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={{ span: 1, offset: 1 }} lg={{ span: 6, offset: 2 }} />
      </Row>
    </div>
  );

  // const goBack = () => (
  //   <Button type="primary" shape="round">
  //     <Link to="/admin/dashboard">
  //       <Icon type="left" />
  //     </Link>
  //   </Button>
  // );
  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>
      <Alert message={error} type="error" />
    </div>
  );

  const showSuccess = () => {
    const successMessage = <h3>{createdProduct} has been created</h3>;

    return (
      <div style={{ display: createdProduct ? "" : "none" }}>
        <Alert message={successMessage} type="success" />;
      </div>
    );
  };

  return (
    <Layout
      title="Add a new product"
      description={`Hello ${user.name}, add a product`}
    >
      {newPostForm()}
    </Layout>
  );
};

export default AddProduct;
