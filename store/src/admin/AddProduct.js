import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Alert,
  InputNumber,
  Select
} from "antd";

const { TextArea } = Input;
// const { Option } = Select;

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
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} />
        <Col xs={{ span: 11, offset: 7 }} lg={{ span: 12, offset: 2 }}>
          {goBack()}
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} />
      </Row>
      <Row>
        <Col xs={{ span: 1, offset: 1 }} lg={{ span: 6, offset: 2 }} />
        {showSuccess()}
        {showError()}
        <Col xs={{ span: 18, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Form className="login-form" onSubmit={clickSubmit}>
            {/* Add photo */}
            <Form.Item>
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
              />
            </Form.Item>
            {/* Add Name */}
            <Form.Item>
              <Input
                type="text"
                placeholder="Add name"
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
            {/* Add price */}
            <Form.Item>
              {/* <InputNumber
                defaultValue={0}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                onChange={handleChange("price")}
                value={price}
              /> */}
              <input
                type="number"
                onChange={handleChange("price")}
                value={price}
              />
            </Form.Item>
            {/* Add Category */}
            <Form.Item>
              <select onChange={handleChange("category")}>
                <option>Please select</option>
                {categories &&
                  categories.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              {/* <Select
                defaultValue="Select Category"
                style={{ width: 120 }}
                onChange={handleChange("category")}
              >
                {categories &&
                  categories.map((c, i) => (
                    <Option key={i} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
              </Select> */}
            </Form.Item>

            {/* Add quantity */}
            <Form.Item>
              <input
                type="number"
                onChange={handleChange("quantity")}
                value={quantity}
              />
              {/* <InputNumber
                defaultValue={0}
                onChange={handleChange("quantity")}
                value={quantity}
              /> */}
            </Form.Item>
            <Form.Item>
              <select onChange={handleChange("shipping")}>
                <option>Please select</option>
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

  const goBack = () => (
    <Button type="primary" icon="left" shape="round">
      <Link to="/admin/dashboard">.</Link>
    </Button>
  );
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

  // const showLoading = () =>
  //   loading && (
  //     <div className="alert alert-success">
  //       <h2>Loading...</h2>
  //     </div>
  //   );

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
