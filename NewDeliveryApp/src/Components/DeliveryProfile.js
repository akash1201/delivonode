import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import SideNav from "./SideNav";

function DeliveryProfile() {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [deliveryinfo, setDeliveryinfo] = useState([]);
  useEffect(async (e) => {
    if (!userInfo) {
      history("/");
    }

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/admin/viewDelivery`, config);
    setDeliveryinfo(data.delivery);
  }, []);
  const handleApproval = async (e) => {
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/admin/approveDelivery/${e}`,
      {},
      config
    );
  };
  const handledisApproval = async (e) => {
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/admin/disapproveDelivery/${e}`,
      {},
      config
    );
  };
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
              <h4 class="card-title">Delivery Personnel Details</h4>
              <p class="card-description">Basic table with card</p>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>ID No.</th>
                      <th>Name</th>
                      <th>E-Mail</th>
                      <th>Phone No.</th>

                      <th>Created On</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryinfo.map((ele) => {
                      return (
                        <tr>
                          <td>{ele._id}</td>
                          <td>{ele.name}</td>
                          <td>{ele.email}</td>
                          <td>{ele.phoneNo}</td>

                          <td>{ele.createdAt}</td>
                          <td>
                            <label class="badge badge-danger">Pending</label>
                          </td>
                          <td>
                            <button
                              class="badge badge-danger"
                              onClick={handleApproval(ele._id)}
                            >
                              Approve
                            </button>
                            <button
                              class="badge badge-danger"
                              // onClick={handledisApproval(ele._id)}
                            >
                              Decline
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td>Samso Park</td>
                      <td>samso@example.com</td>
                      <td>7459658214</td>

                      <td>34424433</td>
                      <td>12 May 2017</td>
                      <td>
                        <label class="badge badge-warning">In progress</label>
                      </td>
                      <td>
                        <button class="badge badge-danger">Approve</button>
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

export default DeliveryProfile;
