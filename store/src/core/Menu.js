import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { Menu, Icon, Dropdown } from "antd";
import { useSelector } from "react-redux";

function navBar(props) {
  const categoriesList = props.categories;
  function subMenu() {
    return (
      <Menu>
        {categoriesList.map(category => (
          <Menu.Item key={category._id}>
            <a>{category.name}</a>
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  return (
    <div>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Dropdown overlay={subMenu()}>
            <a className="ant-dropdown-link">
              Categorias <Icon type="down" />
            </a>
          </Dropdown>
        </Menu.Item>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Menu.Item key="3">
            <Link to="/user/dashboard">Dashboard</Link>
          </Menu.Item>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Menu.Item key="3">
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
        )}
        {!isAuthenticated() && (
          <Menu.Item key="4">
            <Link to="/signin">Signin</Link>
          </Menu.Item>
        )}
        {!isAuthenticated() && (
          <Menu.Item key="5">
            <Link to="/signup">Signup</Link>
          </Menu.Item>
        )}
        {isAuthenticated() && (
          <Menu.Item key="6">
            <span
              onClick={() =>
                signout(() => {
                  props.history.push("/");
                })
              }
            >
              Signout
            </span>
          </Menu.Item>
        )}
        <Menu.Item key="7" style={{ float: "right" }}>
          <Link to="/carrito">
            <Icon type="shopping-cart" style={{ fontSize: "20px" }} />
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default withRouter(navBar);
