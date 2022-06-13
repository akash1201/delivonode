import SideNav from "./SideNav";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import list from "./list.png";

function Complaints() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [complaints, setComplaints] = useState([]);
  useEffect(async (e) => {
    if (!userInfo) {
      history("/");
    }
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/admin/viewComplaints`, config);
    setComplaints(data.complaints);
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
          <h2>Logout</h2>
        </div>
      </div>
      <div className="bottomHeader">
        <div className="lefty">
          <SideNav isActive={isActive} />
        </div>
        <div className="righty  page-content page-container" id="page-content">
          <div
            className="row container d-flex justify-content-center"
            style={{ padding: "1rem" }}
          >
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Complaint Details</h4>
                <p className="card-description"></p>
              </div>
            </div>
          </div>
          <div className="row container d-flex " style={{ padding: "1rem" }}>
            {complaints.map((ele) => {
              return (
                <div
                  className="card"
                  style={{ width: "30rem", marginBottom: "1rem" }}
                >
                  <div className="card-body">
                    <h4 className="card-title">User Id:- {ele.storeId}</h4>
                    <h4 className="card-title"> Phone:- {ele.phoneNo}</h4>
                    <p className="card-description">Issue:- {ele.message}</p>
                    <button type="button" className="btn btn-danger">
                      Reply
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

export default Complaints;
