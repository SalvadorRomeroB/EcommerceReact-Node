import React from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { isAuthenticated } from "../auth";
import "../index.css";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <Card title="Admin Links" hoverable="true" className="custom-card">
        <Row>
          <Link to="/create/category"> Create Category </Link>
        </Row>
        <Row>
          <Link to="/create/product"> Create Product </Link>
        </Row>
      </Card>
    );
  };

  const adminInfo = () => {
    return (
      <Card title="User Information" hoverable="true" className="custom-card">
        <p>{name}</p>
        <p>{email}</p>
        <p>{role === 1 ? "Admin" : "Registered User"}</p>
      </Card>
    );
  };

  return (
    <Layout title="Admin Dashboard" description={`Welcome ${name}!`}>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          {adminLinks()}
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} />
      </Row>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          {adminInfo()}
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} />
      </Row>
    </Layout>
  );
};

export default AdminDashboard;
