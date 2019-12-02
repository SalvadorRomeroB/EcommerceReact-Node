import React from "react";
import Menu from "./Menu";
import { Layout, Row, Col } from "antd";
import { useSelector } from "react-redux";

const { Header, Content, Footer } = Layout;
const PageLayout = ({
  title = "Title",
  description = "Description",
  children
}) => {
  const categoryList = useSelector(state => state.categoryReducer);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu categories={categoryList} />
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <Row style={{ textAlign: "center" }}>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} />
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              <h1> {title} </h1>
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} />
          </Row>
          <Row style={{ textAlign: "center" }}>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} />
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              <h3> {description} </h3>
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} />
          </Row>
          <div>{children}</div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Tlaloc ©2019 Created by Salva and Jaquez
      </Footer>
    </Layout>
  );
};

export default PageLayout;
