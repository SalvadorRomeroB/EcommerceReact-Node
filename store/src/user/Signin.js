import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signIn, authenticate } from "../auth";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import { isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = input => event => {
    setValues({ ...values, error: false, [input]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signIn({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  // FORM
  const signInForm = () => (
    <Row>
      <Col xs={{ span: 1, offset: 1 }} lg={{ span: 6, offset: 2 }} />

      <Col xs={{ span: 18, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        {showIsLoading()}
        {showError()}
        <Form className="login-form">
          <Form.Item>
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
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
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={clickSubmit}>
              Log in
            </Button>
            or <Link to="/signup"> register now!</Link>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={{ span: 1, offset: 1 }} lg={{ span: 6, offset: 2 }} />
    </Row>
  );

  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>{error}</div>
  );

  const showIsLoading = () =>
    loading && (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout title="Sign In" description="Please enter email and password">
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
