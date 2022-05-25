import React from "react";
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="sidenav">
      <div className="logo-containt">
        <div className="logo">
          <i className="bx bxl-c-plus-plus"></i>
          <div className="logo_name"> Swiggy </div>
          <i className="bx bx-menu" id="btn"></i>
        </div>

        <ul className="nav-list">
          <li>
            <Link to="/order">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="links-name">Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/product">
              <i className="bx bx-grid-alt"></i>
              <span className="links-name">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/insights">
              <i className="bx bx-bar-chart-alt"></i>
              <span className="links-name">Insights</span>
            </Link>
          </li>
          <li>
            <Link to="/reviews">
              <i className="bx bx-grid-alt"></i>
              <span className="links-name">Review</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <i className="bx bx-cog"></i>
              <span className="links-name">Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/terms">
              <i className="bx bx-grid-alt"></i>
              <span className="links-name">Term & Condition</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
