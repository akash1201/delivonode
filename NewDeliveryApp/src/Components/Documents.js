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
    async function fetchInfo() {
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
    }
    fetchInfo();
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
      `/api/admin/disapproveVendors/${vendordata}`,
      {},
      config
    );
  };
  return (
    <div className="profiler">
      <div class="profiler-documents">
        <div className="row" style={{ padding: "1rem" }}>
          <div className="col-6">
            <h2 className="mb-3" style={{ fontWeight: "900", color: "navy" }}>
              DOCUMENTS
            </h2>
          </div>
          {/* <div className="col-12"> */}
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-interval="10000">
                <div className="row" style={{ marginLeft: "10rem" }}>
                  <div className="col">
                    <div
                      className="card"
                      style={{
                        boxShadow:
                          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                      }}
                    >
                      <img
                        className="img-fluid"
                        style={{ width: "15rem", height: "15rem" }}
                        src={vendorInfo.storeImage}
                      />
                      <div className="card-body">
                        <h4 className="card-title">Store Image</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div
                      className="card"
                      style={{
                        boxShadow:
                          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                      }}
                    >
                      <img
                        className="img-fluid"
                        style={{ width: "15rem", height: "15rem" }}
                        src={vendorInfo.licenseImage}
                      />
                      <div className="card-body">
                        <h4 className="card-title">License Image</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div
                      className="card"
                      style={{
                        boxShadow:
                          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                      }}
                    >
                      <img
                        className="img-fluid"
                        style={{ width: "15rem", height: "15rem" }}
                        src={vendorInfo.uploadPan}
                      />
                      <div className="card-body">
                        <h4 className="card-title">Pan Card Image</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row" style={{ marginLeft: "10rem" }}>
                  <div className="col">
                    <div
                      className="card"
                      style={{
                        boxShadow:
                          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                      }}
                    >
                      <img
                        className="img-fluid"
                        style={{ width: "15rem", height: "15rem" }}
                        src={vendorInfo.uploadGSTcertificate}
                      />
                      <div className="card-body">
                        <h4 className="card-title">GST Certificate</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div
                      className="card"
                      style={{
                        boxShadow:
                          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                      }}
                    >
                      <img
                        className="img-fluid"
                        style={{ width: "15rem", height: "15rem" }}
                        src={vendorInfo.uploadMenu}
                      />
                      <div className="card-body">
                        <h4 className="card-title">Menu Card Image</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div
                      className="card"
                      style={{
                        boxShadow:
                          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                      }}
                    >
                      <img
                        className="img-fluid"
                        style={{ width: "15rem", height: "15rem" }}
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
          {/* </div> */}
        </div>
      </div>
      <div class="profiler-info">
        <div>
          <h4>
            Store Address.
            <span>
              {vendorInfo.address.streetName},{vendorInfo.address.streetNumber},
              {vendorInfo.address.city},{vendorInfo.address.stateCode},
              {vendorInfo.address.countryCode}
              {vendorInfo.address.zipcode}
            </span>
          </h4>
        </div>
        <div>
          <h4>
            License Type. <span>{vendorInfo.liscenseType}</span>
          </h4>
        </div>
        <div>
          <h4>
            License No. <span>{vendorInfo.liscenseNo}</span>
          </h4>
        </div>
        <div>
          <h4>
            GST No. <span>{vendorInfo.gst}</span>
          </h4>
        </div>
        <div>
          <h4>
            PAN No. <span>{vendorInfo.ownerPan}</span>
          </h4>
        </div>
        <div>
          <h4>
            Store Rating <span>{vendorInfo.storeRating}</span>
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
