import SideNav from "./SideNav";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import list from "./list.png";
import logout from "./img/poweroff.png";

function Categories() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [mycategory, setMycategory] = useState([]);
  useEffect(async (e) => {
    if (!userInfo) {
      history("/");
    }
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/admin/viewCategory`, config);
    setMycategory(data.category);
  }, []);
  return (
    <div className="main">
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
          <img src={logout} style={{ width: "3rem", height: "2.8rem" }} />
        </div>
      </div>
      <div className="bottomHeader">
        <div className="lefty">
          <SideNav isActive={isActive} />
        </div>
        <div className="righty  page-content page-container" id="page-content">
          <div
            className="row container d-flex justify-content-center"
            style={{ paddingLeft: "2rem", paddingTop: "1rem" }}
          >
            <h4
              className="card-title"
              style={{
                fontWeight: "900",
                width: "20rem",
                padding: "1rem",
              }}
            >
              Category Details
            </h4>
          </div>
          <div
            className="row container d-flex justify-content-around"
            style={{ paddingLeft: "2rem", paddingTop: "1rem" }}
          >
            {mycategory.map((ele, index) => {
              return (
                <div
                  key={index + 1}
                  className="card"
                  style={{
                    width: "18rem",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={ele.image}
                    className="card-img-top"
                    alt="..."
                    style={{ backgroundColor: ele.bgColor }}
                  />
                  <div className="card-body" style={{ padding: "0rem" }}>
                    <h4 className="card-title">{ele.parent}</h4>
                    <p className="card-description">{ele.subcategory}</p>
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ width: "100%", height: "3rem" }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ width: "100%", height: "3rem" }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
