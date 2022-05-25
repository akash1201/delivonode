import React from "react";
import { Link } from "react-router-dom";

function TopNav() {
  return (
    <div class="topnav">
      <Link class="active hamburger" to="/wallet">
        <i class="fa-solid fa-fw fa-wallet"></i>Burger
      </Link>
      <Link class="active" to="/wallet">
        <i class="fa-solid fa-fw fa-wallet"></i>Wallet
      </Link>
      <Link class="active" to="/support">
        <i class="fa-solid fa-fw fa-wallet"></i>Help
      </Link>
      <Link class="active" to="/support">
        <i class="fa-solid fa-fw fa-wallet"></i>Logout
      </Link>
    </div>
  );
}

export default TopNav;
