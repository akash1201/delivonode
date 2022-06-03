import SideNav from "./SideNav";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function VendorDetails() {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [vendorinfo, setVendorinfo] = useState([]);
  useEffect(async (e) => {
    if (!userInfo) {
      history("/");
    }
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/admin/viewVendors`, config);
    setVendorinfo(data.vendors);
    console.log(vendorinfo);
  }, []);

  return (
    <div className="main">
      <div className="lefty">
        <SideNav />
      </div>
      {/* all-data */}
      <div className="righty  page-content page-container" id="page-content">
        <div class="row container d-flex justify-content-center">
          <div class="card">
            <div class="card-body">
              <h4
                class="card-title"
                style={{
                  fontWeight: "900",
                  width: "20rem",
                  padding: "1rem",
                  border: "2px solid black",
                }}
              >
                Vendor Details
              </h4>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Store Name</th>
                      <th>E-Mail</th>
                      <th>Phone No.</th>
                      <th>Category</th>
                      <th>Created</th>
                      <th>Status</th>
                      <th>Documents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorinfo.map((ele, index) => {
                      return (
                        <tr>
                          <td>{index + 1} </td>
                          <td>{ele.storeName}</td>
                          <td>{ele.email}</td>
                          <td>{ele.phoneNo}</td>
                          <td>{ele.categories}</td>
                          <td>12/05/2017</td>
                          <td>
                            <label class="badge badge-danger">Pending</label>
                          </td>
                          <td>
                            <button
                              class="badge badge-danger"
                              onClick={() => history(`/vendorInfo/${ele._id}`)}
                            >
                              View Documents
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>7459658214</td>
                      <td>Samso Park</td>
                      <td>samso@example.com</td>
                      <td>5825415689</td>
                      <td>Vegetables & Fruits </td>
                      <td>12 May 2017</td>
                      <td>
                        <label class="badge badge-warning">In progress</label>
                      </td>
                      <td>
                        <button class="badge badge-danger">Approve</button>
                      </td>
                    </tr>
                    <tr>
                      <td>7459658214</td>
                      <td>Samso Park</td>
                      <td>samso@example.com</td>
                      <td>5825415689</td>
                      <td>Vegetables & Fruits </td>
                      <td>12 May 2017</td>
                      <td>
                        <label class="badge badge-info">Fixed</label>
                      </td>
                      <td>
                        <button class="badge badge-danger">Approve</button>
                      </td>
                    </tr>
                    <tr>
                      <td>7459658214</td>
                      <td>Samso Park</td>
                      <td>samso@example.com</td>
                      <td>5825415689</td>
                      <td>Vegetables & Fruits </td>
                      <td>12 May 2017</td>
                      <td>
                        <label class="badge badge-success">Completed</label>
                      </td>
                      <td>
                        <button class="badge badge-danger">Approve</button>
                      </td>
                    </tr>
                    <tr>
                      <td>7459658214</td>
                      <td>Samso Park</td>
                      <td>samso@example.com</td>
                      <td>5825415689</td>
                      <td>Vegetables & Fruits </td>
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
      <div
        className="modal fade"
        id="storeinfo"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Terms of Use
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="txt">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
            </div>

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Company Policy
              </h5>
            </div>
            <div className="modal-body">
              <div className="txt">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDetails;
