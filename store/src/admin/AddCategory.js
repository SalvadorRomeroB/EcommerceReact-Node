import React, { useState } from "react";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";
import styles from "./styles.module.css";
import { Form, Input, Button, Row, Col, message } from "antd";

const key = "updatable";

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
    setName("");
  };

  const newCategoryFrom = () => (
    <div>
      <Row className={styles.box}>
        {showSuccess()}
        {showError()}
        <Col lg={2} xs={0} />
        <Col xs={24} lg={20}>
          <Form className="login-form" onSubmit={clickSubmit}>
            <Form.Item>
              <input
                className={styles.inpFormat}
                type="text"
                placeholder="category name"
                onChange={handleChange}
                value={name}
                autoFocus
                required
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                size="large"
              >
                Create Category
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col lg={2} xs={0} />
      </Row>
    </div>
  );

  const showSuccess = () => {
    if (success) {
      message.success({
        content: "Category added succesfully",
        key,
        duration: 2
      });
      return <Redirect to="/admin/dashboard" />;
    }
  };

  const showError = () => {
    if (error) {
      message.error({
        content: "Error, category already exists",
        key,
        duration: 2
      });
    }
  };

  // const goBack = () => (
  //   <Button type="primary" shape="round">
  //     <Link to="/admin/dashboard">
  //       <Icon type="left" />
  //     </Link>
  //   </Button>
  // );

  return (
    <Layout
      title="Create Category"
      description={`Welcome back ${user.name}, please enter category name to add`}
    >
      {newCategoryFrom()}
    </Layout>
  );
};

export default AddCategory;
