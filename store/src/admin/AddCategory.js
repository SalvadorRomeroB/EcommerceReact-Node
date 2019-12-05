import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";
import { Form, Input, Button, Row, Col, Alert } from "antd";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructurar usuario y toquen
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //request Create Category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryFrom = () => (
    <div>
      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} />
        <Col xs={{ span: 11, offset: 7 }} lg={{ span: 12, offset: 4 }}>
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
            <Form.Item>
              <Input
                //   prefix={<Icon type="" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                placeholder="category name"
                onChange={handleChange}
                value={name}
                autoFocus
                required
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Category
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={{ span: 1, offset: 1 }} lg={{ span: 6, offset: 2 }} />
      </Row>
    </div>
  );

  const showSuccess = () => {
    if (success) {
      const successMessage = <h3>{name} has been created</h3>;
      return <Alert message={successMessage} type="success" />;
    }
  };
  const showError = () => {
    if (error) {
      const errorMessage = `Category should be unique`;
      return <Alert message={errorMessage} type="error" />;
    }
  };
  const goBack = () => (
    <Button type="primary" icon="left" shape="round">
      <Link to="/admin/dashboard">.</Link>
    </Button>
  );

  return (
    <Layout
      title="Create Category"
      description={`Welcome back ${user.name}, please create new category`}
    >
      {newCategoryFrom()}
    </Layout>
  );
};

export default AddCategory;
