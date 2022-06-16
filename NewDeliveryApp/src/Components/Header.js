import React from "react";
import list from "./list.png";
import logout from "./img/poweroff.png";
import { useNavigate, Link } from "react-router-dom";

function Header({ toggleClass }) {
  const history = useNavigate();
  const checklogout = () => {
    localStorage.removeItem("userInfo");
    setTimeout(() => {
      history("/");
    }, 1000);
  };
  return (
    <div className="topHeader">
      <div className="top_title">
        <img
          src={list}
          style={{
            width: "2rem",
            height: "2rem",
            marginRight: "2rem",
            marginTop: "0.5rem",
          }}
          onClick={toggleClass}
        ></img>
        <h2>Gravity Bites</h2>
      </div>
      <div className="topLogout">
        <img
          src={logout}
          style={{ width: "3rem", height: "2.8rem" }}
          onClick={checklogout}
        />
      </div>
    </div>
  );
}

export default Header;
