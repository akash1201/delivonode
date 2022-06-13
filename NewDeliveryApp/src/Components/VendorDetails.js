import SideNav from "./SideNav";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import list from "./list.png";

function VendorDetails() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [vendorinfo, setVendorinfo] = useState([]);
  useEffect((e) => {
    async function fetchInfo() {
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/admin/viewVendors`, config);
      setVendorinfo(data.vendors);
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
          <h2>Logout</h2>
        </div>
      </div>
      <div className="bottomHeader">
        <div className="lefty">
          <SideNav isActive={isActive} />
        </div>
        {/* all-data */}
        <div className="righty  page-content page-container" id="page-content">
          <div
            className="row container d-flex justify-content-center"
            style={{ paddingLeft: "2rem", paddingTop: "1rem" }}
          >
            <div className="card">
              <div className="card-body">
                <h4
                  className="card-title"
                  style={{
                    fontWeight: "900",
                    width: "20rem",
                    padding: "1rem",
                  }}
                >
                  Vendor Details
                </h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr.</th>
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
                          <tr key={index + 1}>
                            <td>
                              {index + 1} {"     "}{" "}
                            </td>
                            <td>{ele.storeName}</td>
                            <td>{ele.email}</td>
                            <td>{ele.phoneNo}</td>
                            <td>{ele.categories}</td>
                            <td>12/05/2017</td>
                            <td>Pending</td>
                            <td>
                              <button
                                style={{ width: "8rem", height: "3rem" }}
                                className="badge badge-danger"
                                onClick={() =>
                                  history(`/vendorInfo/${ele._id}`)
                                }
                              >
                                View Documents
                              </button>
                            </td>
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
