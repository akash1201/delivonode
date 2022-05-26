import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./sideNav.css";
import order from "./order.png";
import product from "./product.png";
import terms from "./terms.png";
import insight from "./insight.png";
import setting from "./setting.png";
import reviews from "./reviews.png";

function SideNav() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <div className="sidenav">
      <div id="wrapper" className={isActive ? "active" : null}>
        <div id="sidebar-wrapper">
          <ul id="sidebar_menu" className="sidebar-nav">
            <li className="sidebar-brand">
              <a id="menu-toggle" href="#" onClick={toggleClass}>
                Menu
                <span
                  id="main_icon"
                  className="glyphicon glyphicon-align-justify"
                ></span>
              </a>
            </li>
          </ul>
          <ul className="sidebar-nav" id="sidebar">
            <li>
              <a>Orders</a>
              <img
                src={order}
                style={{
                  width: "4rem",
                  height: "4rem",
                  color: "black",
                  marginTop: "2rem",
                  marginRight: "1rem",
                }}
              />
            </li>

            <li>
              <a>Product</a>
              <img
                src={product}
                style={{
                  width: "4rem",
                  height: "4rem",
                  color: "black",
                  marginTop: "2rem",
                  marginRight: "1rem",
                  fontWeight: "700",
                }}
              />
            </li>
            <li>
              <a>Insights</a>
              <img
                src={insight}
                style={{
                  width: "4rem",
                  height: "4rem",
                  color: "black",
                  marginTop: "2rem",
                  marginRight: "1rem",
                }}
              />
            </li>
            <li>
              <a>Reviews</a>
              <img
                src={reviews}
                style={{
                  width: "4rem",
                  height: "4rem",
                  color: "black",
                  marginTop: "2rem",
                  marginRight: "1rem",
                }}
              />
            </li>
            <li>
              <a>Settings</a>
              <img
                src={setting}
                style={{
                  width: "4rem",
                  height: "4rem",
                  color: "black",
                  marginTop: "2rem",
                  marginRight: "1rem",
                }}
              />
            </li>
            <li>
              <a>Terms</a>
              <img
                src={terms}
                style={{
                  width: "4rem",
                  height: "4rem",
                  color: "black",
                  marginTop: "2rem",
                  marginRight: "1rem",
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
