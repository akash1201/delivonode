import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import SideNav from "./SideNav";

function Users() {
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
      <div className="lefty">
        <SideNav />
      </div>
      {/* all-data */}
      <div className="righty  page-content page-container" id="page-content">
        {/* <div class="padding"> */}
        <div class="row container d-flex justify-content-center">
          {/* <div class="col-lg-8 grid-margin stretch-card"> */}
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Customer Details</h4>
              <p class="card-description">Basic table with card</p>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>ID No.</th>
                      <th>Name</th>
                      <th>E-Mail</th>
                      <th>Phone No.</th>
                      <th>Address</th>

                      <th>Created On</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userinfo.map((ele) => {
                      return (
                        <tr>
                          <td>{ele._id}</td>
                          <td>
                            {ele.name} {ele.lastName}
                          </td>
                          <td>{ele.email}</td>
                          <td>{ele.phoneNo}</td>
                          <td>
                            {ele.address.streetName},{ele.address.city}{" "}
                          </td>

                          <td>{ele.createdAt}</td>
                          <td>
                            <label class="badge badge-danger">Pending</label>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>7459658214</td>
                      <td>Samso Park</td>
                      <td>samso@example.com</td>
                      <td>5825415689</td>
                      <td>Sectore-143, Delhi </td>

                      <td>12 May 2017</td>
                      <td>
                        <label class="badge badge-warning">In progress</label>
                      </td>
                    </tr>
                    <tr>
                      <td>7459658214</td>
                      <td>Samso Park</td>
                      <td>samso@example.com</td>
                      <td>5825415689</td>
                      <td>Sectore-143, Delhi </td>

                      <td>12 May 2017</td>
                      <td>
                        <label class="badge badge-info">Fixed</label>
                      </td>
                    </tr>
                    <tr>
                      <td>7459658214</td>
                      <td>Samso Park</td>
                      <td>samso@example.com</td>
                      <td>5825415689</td>
                      <td>Sectore-143, Delhi </td>

                      <td>12 May 2017</td>
                      <td>
                        <label class="badge badge-success">Completed</label>
                      </td>
                    </tr>
                    <tr>
                      <td>7459658214</td>
                      <td>Samso Park</td>
                      <td>samso@example.com</td>
                      <td>5825415689</td>
                      <td>Sectore-143, Delhi </td>

                      <td>12 May 2017</td>
                      <td>
                        <label class="badge badge-warning">In progress</label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
}
export default Users;
