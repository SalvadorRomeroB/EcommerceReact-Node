import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { Menu } from "antd";

const navBar = ({ history }) => (
  <div>
    <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <Menu.Item key="2">
          <Link to="/user/dashboard">Dashboard</Link>
        </Menu.Item>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <Menu.Item key="2">
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
      )}
      {!isAuthenticated() && (
        <Menu.Item key="3">
          <Link to="/signin">Signin</Link>
        </Menu.Item>
      )}
      {!isAuthenticated() && (
        <Menu.Item key="4">
          <Link to="/signup">Signup</Link>
        </Menu.Item>
      )}
      {isAuthenticated() && (
        <Menu.Item key="5">
          <span
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Signout
          </span>
        </Menu.Item>
      )}
    </Menu>
  </div>
);

export default withRouter(navBar);
