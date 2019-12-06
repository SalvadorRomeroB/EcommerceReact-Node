import React from "react";
import Menu from "./Menu";
import { Layout, Row, Col } from "antd";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

const { Header, Content, Footer } = Layout;
const PageLayout = ({ title = "Title", description = "", children }) => {
  const categoryList = useSelector(state => state.categoryReducer);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />

        <Menu categories={categoryList} />
      </Header>

      <Content>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <Row style={{ textAlign: "center" }}>
            <Col span={24}>
              <h1 className={`${styles.titleFont} ${styles.centered}`}>
                {title}
              </h1>
            </Col>
          </Row>
          <Row style={{ textAlign: "center" }}>
            <Col span={24}>
              <h3> {description} </h3>
            </Col>
          </Row>
          <Row style={{ textAlign: "center" }}>
            <Col span={24}>
              <div className={styles.centered}>{children}</div>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer className={styles.centered}>
        Tlaloc ©2019 Created by Salva and Jaquez
      </Footer>
    </Layout>
  );
};

export default PageLayout;
