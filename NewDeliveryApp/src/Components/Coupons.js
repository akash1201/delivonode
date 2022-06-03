import SideNav from "./SideNav";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Coupons() {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [mycoupon, setMycoupon] = useState([]);
  useEffect(async (e) => {
    if (!userInfo) {
      history("/");
    }
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/admin/viewCoupon`, config);
    setMycoupon(data.coupon);
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
              <h4 className="card-title">Coupon Details</h4>
              <p className="card-description"></p>
            </div>
          </div>
        </div>
        <div className="row container d-flex " style={{ padding: "1rem" }}>
          {mycoupon.map((ele) => {
            return (
              <div
                className="card"
                style={{ width: "18rem", marginBottom: "1rem" }}
              >
                <img src={ele.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h4 className="card-title">{ele.name}</h4>
                  <p className="card-description">{ele.description}</p>
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

export default Coupons;
