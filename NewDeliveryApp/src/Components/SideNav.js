import React from "react";

function SideNav() {
  return (
    <div className="sidebar">
      <ul className="nav-list">
        <li>
          <a href="#">
            <i className="bx bxs-dashboard"></i>
            <span className="links-name">Store-Info</span>
          </a>
        </li>
        <li>
          <a href="Users">
            <i className="bx bx-user"></i>
            <span className="Users">User-Info</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-list-ul"></i>
            <span className="links-name">Delivery-Info</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-flag"></i>
            <span className="links-name">Add Category</span>
          </a>
        </li>
        <li>
          <a href="DeliveryProfile">
            <i className="bx bxs-truck"></i>
            <span className="DeliveryProfile">Add Coupon</span>
          </a>
        </li>
        <li>
          <a href="VendorDetails">
            <i className="bx bx-group"></i>
            <span className="links-name">Categories</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bxs-dashboard"></i>
            <span className="links-name">Coupons</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="bx bx-cart"></i>
            <span className="links-name">Complaints</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bxs-dashboard"></i>
            <span className="links-name">Earnings</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
