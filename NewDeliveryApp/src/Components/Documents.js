import SideNav from "./SideNav";
import { React, useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import jle12 from "./jle12.png";

function Documents() {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const vendordata = useParams().Id;
  console.log(vendordata, "111");
  const [vendorInfo, setVendorInfo] = useState({
    address: {
      streetName: "",
      city: "",
    },
  });
  useEffect(async (e) => {
    if (!userInfo) {
      history("/");
    }
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/admin/viewParticularVendor/${vendordata}`,
      config
    );
    setVendorInfo(data.vendor);
  }, []);
  const handleApproval = async (e) => {
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/admin/approveVendors/${vendordata}`,
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
      `/api/admin/viewdisapproveVendor/${vendordata}`,
      {},
      config
    );
  };
  return (
    <div className="profiler">
      <div class="profiler-documents">
        {/* <section className="pt-5 pb-5 our-products">
        </section> */}
        {/* <div className="container-fluid">
        </div> */}
        <div className="row" style={{ padding: "1rem" }}>
          <div className="col-6">
            <h2 className="mb-3" style={{ fontWeight: "900", color: "navy" }}>
              DOCUMENTS
            </h2>
          </div>
          <div className="col-6 text-right" style={{ left: "23rem" }}>
            <a
              className="btn btn-primary mb-3 mr-1"
              href="#carouselExampleIndicators2"
              role="button"
              data-slide="prev"
            >
              <i className="fa fa-arrow-left"></i>
            </a>
            <a
              className="btn btn-primary mb-3"
              href="#carouselExampleIndicators2"
              role="button"
              data-slide="next"
            >
              <i className="fa fa-arrow-right"></i>
            </a>
          </div>
          <div className="col-12">
            <div
              id="carouselExampleIndicators2"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-md-4 mb-3 card-column">
                      <div
                        className="card"
                        style={{
                          boxShadow:
                            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                        }}
                      >
                        <img
                          className="img-fluid"
                          alt="100%x280"
                          src={vendorInfo.uploadAadharfront}
                        />
                        <div className="card-body">
                          <h4 className="card-title">Aadhar Card Front</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 card-column">
                      <div
                        className="card"
                        style={{
                          boxShadow:
                            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                        }}
                      >
                        <img
                          className="img-fluid"
                          alt="100%x280"
                          src={vendorInfo.uploadAadharback}
                        />
                        <div className="card-body">
                          <h4 className="card-title">Aadhar Card Back</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 card-column">
                      <div
                        className="card"
                        style={{
                          boxShadow:
                            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                        }}
                      >
                        <img
                          className="img-fluid"
                          alt="100%x280"
                          src={vendorInfo.uploadPan}
                        />
                        <div className="card-body">
                          <h4 className="card-title">PAN Card</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-md-4 mb-3 card-column">
                      <div
                        className="card"
                        style={{
                          boxShadow:
                            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                        }}
                      >
                        <img
                          className="img-fluid"
                          alt="100%x280"
                          src={vendorInfo.uploadGSTcertificate}
                        />
                        <div className="card-body">
                          <h4 className="card-title">GST Certificate</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 card-column">
                      <div
                        className="card"
                        style={{
                          boxShadow:
                            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                        }}
                      >
                        <img
                          className="img-fluid"
                          alt="100%x280"
                          src={vendorInfo.uploadMenu}
                        />
                        <div className="card-body">
                          <h4 className="card-title">Store Menu</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 card-column">
                      <div
                        className="card"
                        style={{
                          boxShadow:
                            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                        }}
                      >
                        <img
                          className="img-fluid"
                          alt="100%x280"
                          src={vendorInfo.cancelledCheque}
                        />
                        <div className="card-body">
                          <h4 className="card-title">Cancelled Cheque</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="profiler-info">
        <div>
          <h4>
            Store Address.{" "}
            <span>
              {vendorInfo.address.streetName},{vendorInfo.address.city}
            </span>
          </h4>
        </div>
        <div>
          {" "}
          <h4>
            License No. <span>{vendorInfo.liscenseNo}</span>
          </h4>
        </div>
        <div>
          {" "}
          <h4>
            GST No. <span>{vendorInfo.gst}</span>
          </h4>
        </div>
        <div>
          {" "}
          <h4>
            PAN No. <span>{vendorInfo.ownerPan}</span>
          </h4>
        </div>{" "}
        <div>
          {" "}
          <h4>
            Aadhar No. <span>{vendorInfo.ownerAadhar}</span>
          </h4>
        </div>
      </div>
      <div class="updateStatus">
        <button type="button" onClick={handleApproval}>
          Approve Account
        </button>
        <button type="button" onClick={handledisApproval}>
          Decline Account
        </button>
      </div>
    </div>
  );
}

export default Documents;
