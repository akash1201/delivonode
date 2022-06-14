import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import SideNav from "./SideNav";
import list from "./list.png";
import logout from "./img/poweroff.png";

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
    async function fetchInfo() {
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/admin/viewCustomers`, config);
      setUserinfo(data.customers);
    }
    fetchInfo();
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
                <h4
                  className="card-title"
                  style={{
                    fontWeight: "900",
                    width: "20rem",
                    padding: "1rem",
                  }}
                >
                  Customer Details
                </h4>
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
                              {ele.address.streetName},
                              {ele.address.streetNumber},{ele.address.city},
                              {ele.address.stateCode},{ele.address.countryCode},
                            </td>

                            <td>
                              {`${new Date(ele.createdAt).getDate()} -
                                ${new Date(ele.createdAt).getMonth() + 1} -
                                ${new Date(ele.createdAt).getFullYear()}`}
                            </td>
                            <td>{ele.isApproved ? "Approved" : "Pending"}</td>
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
