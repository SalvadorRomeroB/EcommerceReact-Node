import React from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { isAuthenticated } from "../auth";
import "../index.css";

const UserDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <Card title="User Links" hoverable="true" className="custom-card">
        <Row>
          <Link to="/carrito"> My Cart </Link>
        </Row>
        <Row>
          <Link to="/profile/edit"> Edit Profile </Link>
        </Row>
      </Card>
    );
  };

  const userInfo = () => {
    return (
      <Card title="User Information" hoverable="true" className="custom-card">
        <p>{name}</p>
        <p>{email}</p>
        <p>{role === 1 ? "Admin" : "Registered User"}</p>
      </Card>
    );
  };

  const purchaseHistory = () => {
    return (
      <Card title="Purchase History" hoverable="true" className="custom-card">
        <p>History</p>
      </Card>
    );
  };

  return (
    <Layout title="Dashboard" description={`Welcome ${name}!`}>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          {userLinks()}
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} />
      </Row>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          {userInfo()}
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} />
      </Row>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} />
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          {purchaseHistory()}
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} />
      </Row>
    </Layout>
  );
};

export default UserDashboard;
