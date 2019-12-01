import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signUp } from "../auth";
import { Form, Icon, Input, Button, Row, Col } from "antd";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    redirectToReferrer: false
  });

  const { name, email, password, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  const signUpForm = () => (
    <Row>
      <Col xs={{ span: 1, offset: 1 }} lg={{ span: 6, offset: 2 }} />

      <Col xs={{ span: 18, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        <Form className="login-form">
          {showError()}
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="User"
              onChange={handleChange("name")}
              type="text"
              value={name}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              onChange={handleChange("email")}
              type="email"
              value={email}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={handleChange("password")}
              value={password}
            />
          </Form.Item>
          {showSuccess()}
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={clickSubmit}>
              Create Account
            </Button>
            or <Link to="/signin"> Log in!</Link>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={{ span: 1, offset: 1 }} lg={{ span: 6, offset: 2 }} />
    </Row>
  );

  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>{error}</div>
  );

  const showSuccess = () => (
    <div style={{ display: success ? "" : "none" }}>
      New account has been created. Please <Link to="/signin">Log in!</Link>
    </div>
  );

  return (
    <Layout title="Signup" description="Please sign up">
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
