import SideNav from "./SideNav";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import jle12 from "./jle12.png";

function Categories() {
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
      <div className="lefty">
        <SideNav />
      </div>
      <div className="righty  page-content page-container" id="page-content">
        <div
          className="row container d-flex justify-content-center"
          style={{ padding: "1rem" }}
        >
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Category Details</h4>
              <p className="card-description"></p>
            </div>
          </div>
        </div>
        <div className="row container d-flex " style={{ padding: "1rem" }}>
          {mycategory.map((ele) => {
            return (
              <div
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
                <div className="card-body">
                  <h4 className="card-title">{ele.parent}</h4>
                  <p className="card-description">{ele.subcategory}</p>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                  <button type="button" className="btn btn-danger">
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Categories;
