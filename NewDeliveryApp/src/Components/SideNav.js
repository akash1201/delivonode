import { React, useState } from "react";
import terms from "./terms.png";

function SideNav({ isActive }) {
  return (
    <div className={isActive ? "sidebar active" : "sidebar"}>
      <ul className="nav-list">
        <li>
          <a href="#">
            <h3>Store-info</h3>

            <img
              src={terms}
              style={{
                height: "2.5rem",
                color: "black",
              }}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <h3>Customer-info</h3>

            <img
              src={terms}
              style={{
                height: "2.5rem",
                color: "black",
              }}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <h3>Delivery-info</h3>

            <img
              src={terms}
              style={{
                height: "2.5rem",
                color: "black",
              }}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <h3>Categoires</h3>

            <img
              src={terms}
              style={{
                height: "2.5rem",
                color: "black",
              }}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <h3>Coupons</h3>

            <img
              src={terms}
              style={{
                height: "2.5rem",
                color: "black",
              }}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <h3>Add Category</h3>

            <img
              src={terms}
              style={{
                height: "2.5rem",
                color: "black",
              }}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <h3>Add Coupons</h3>

            <img
              src={terms}
              style={{
                height: "2.5rem",
                color: "black",
              }}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <h3>Complaints</h3>

            <img
              src={terms}
              style={{
                height: "2.5rem",
                color: "black",
              }}
            />
          </a>
        </li>
        <li>
          <a href="#">
            <h3>Earnings</h3>

            <img
              src={terms}
              style={{
                height: "2.5rem",
                color: "black",
              }}
            />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
