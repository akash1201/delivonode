import { React, useState } from "react";
import terms from "./terms.png";
import category from "./img/category.png";
import report from "./img/report.png";
import coupon from "./img/coupon.png";
import delivery from "./img/motorbike.png";
import store from "./img/store.png";
import customer from "./img/customer.png";
import earning from "./img/moneybag.png";
import addcoupon from "./img/addcoupon.png";
import addcategory from "./img/addcategory.png";
import { Link } from "react-router-dom";

function SideNav({ isActive }) {
  return (
    <div className={isActive ? "sidebar active" : "sidebar"}>
      <ul className="nav-list">
        <li>
          <Link to="/VendorDetails">
            <h3>Store-info</h3>

            <img
              src={store}
              style={{
                height: "2.0rem",
                color: "black",
              }}
            />
          </Link>
        </li>
        <li>
          <Link to="/Users">
            <h3>Customer-info</h3>

            <img
              src={customer}
              style={{
                height: "2.0rem",
                color: "black",
              }}
            />
          </Link>
        </li>
        <li>
          <Link to="/DeliveryProfile">
            <h3>Delivery-info</h3>

            <img
              src={delivery}
              style={{
                height: "2.0rem",
                color: "black",
              }}
            />
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <h3>Categoires</h3>

            <img
              src={category}
              style={{
                height: "2.0rem",
                color: "black",
              }}
            />
          </Link>
        </li>
        <li>
          <Link to="/coupons">
            <h3>Coupons</h3>

            <img
              src={coupon}
              style={{
                height: "2.0rem",
                color: "black",
              }}
            />
          </Link>
        </li>
        <li>
          <Link to="/addcategory">
            <h3>Add Category</h3>

            <img
              src={addcategory}
              style={{
                height: "2.0rem",
                color: "black",
              }}
            />
          </Link>
        </li>
        <li>
          <Link to="/addcoupon">
            <h3>Add Coupons</h3>

            <img
              src={addcoupon}
              style={{
                height: "2.0rem",
                color: "black",
              }}
            />
          </Link>
        </li>
        <li>
          <Link to="/complaints">
            <h3>Complaints</h3>

            <img
              src={report}
              style={{
                height: "2.0rem",
                color: "black",
              }}
            />
          </Link>
        </li>
        <li>
          <Link to="/complaints">
            <h3>Earnings</h3>

            <img
              src={earning}
              style={{
                height: "2.0rem",
                color: "black",
              }}
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
