import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import SideNav from "./SideNav";
import list from "./list.png";

function Users() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [userinfo, setUserinfo] = useState([]);
  useEffect(async (e) => {
    if (!userInfo) {
      history("/");
    }

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/admin/viewCustomers`, config);
    setUserinfo(data.customers);
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
        {/* all-data */}
        <div className="righty  page-content page-container" id="page-content">
          {/* <div class="padding"> */}
          <div
            class="row container d-flex justify-content-center"
            style={{ paddingLeft: "2rem", paddingTop: "1rem" }}
          >
            {/* <div class="col-lg-8 grid-margin stretch-card"> */}
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Customer Details</h4>
                <p class="card-description">Basic table with card</p>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Sr</th>
                        <th>Name</th>
                        <th>E-Mail</th>
                        <th>Phone No.</th>
                        <th>Address</th>

                        <th>Created On</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userinfo.map((ele, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              {ele.name} {ele.lastName}
                            </td>
                            <td>{ele.email}</td>
                            <td>{ele.phoneNo}</td>
                            <td>
                              {ele.address.streetName},{ele.address.city}{" "}
                            </td>

                            <td>{ele.createdAt}</td>
                            <td>Pending</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
export default Users;
