import React from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { Card, Row } from "antd";
import { isAuthenticated } from "../auth";

const UserDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <Card title="User Links" hoverable="true">
        <Row>
          <Link to="/carrito"> My Cart </Link>
        </Row>
      </Card>
    );
  };

  const userInfo = () => {
    return (
      <Card title="User Information" hoverable="true">
        <p>{name}</p>
        <p>{email}</p>
        <p>{role === 1 ? "Admin" : "Registered User"}</p>
      </Card>
    );
  };

  const purchaseHistory = () => {
    return (
      <Card title="Purchase History" hoverable="true">
        <p>History</p>
      </Card>
    );
  };

  return (
    <Layout title="Dashboard" description={`Welcome back ${name}!`}>
      {userLinks()}
      {userInfo()}
      {purchaseHistory()}
    </Layout>
  );
};

export default UserDashboard;
