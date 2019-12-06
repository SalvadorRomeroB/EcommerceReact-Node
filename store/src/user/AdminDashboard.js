import React from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { Card, Row } from "antd";
import { isAuthenticated } from "../auth";

const AdminDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <Card title="Admin Links" hoverable="true">
        <Row>
          <Link to="/create/category"> Create Category </Link>
        </Row>
        <Row>
          <Link to="/create/product"> Create Product </Link>
        </Row>
        <Row>
          <Link to="/admin/products"> Manage Products </Link>
        </Row>
      </Card>
    );
  };

  const adminInfo = () => {
    return (
      <Card title="User Information" hoverable="true">
        <p>{name}</p>
        <p>{email}</p>
        <p>{role === 1 ? "Admin" : "Registered User"}</p>
      </Card>
    );
  };

  return (
    <Layout title="Admin Dashboard" description={`Welcome back ${name}!`}>
      {adminLinks()}
      {adminInfo()}
    </Layout>
  );
};

export default AdminDashboard;
