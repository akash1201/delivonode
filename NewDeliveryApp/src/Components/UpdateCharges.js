import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "./SideNav";
import Header from "./Header.js";
import axios from "axios";

function UpdateCharges() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/admin/updateCharges`, item, config);
  };

  const [item, setItem] = useState({
    serviceFee: "",
    distanceFee: "",
    baseFare: "",
    customdistanceFee: "",
    customPackaging: "",
  });

  const handleChange = (event) => {
    setItem({ ...item, [event.target.id]: event.target.value });
  };

  return (
    <div className="main">
      <Header toggleClass={toggleClass} />
      <div className="bottomHeader">
        <div className="lefty">
          <SideNav isActive={isActive} />
        </div>
        <div className="righty  page-content page-container" id="page-content">
          <div className="row container d-flex justify-content-center">
            <div className="container1">
              <form
                onSubmit={handleSubmit}
                style={{
                  boxShadow:
                    " rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px",
                }}
              >
                <div className="form first">
                  <div className="details personal">
                    <span
                      className="title"
                      style={{
                        fontWeight: "900",
                        width: "50%",
                        margin: "0 auto",
                        fontSize: "2rem",
                      }}
                    >
                      Update Charges for different attributes
                    </span>
                    <div className="fields" style={{ marginBottom: "1rem" }}>
                      <div
                        className="input-fields"
                        style={{ margin: "0 auto" }}
                      >
                        <label for="" style={{ fontSize: "1.2rem" }}>
                          Service Charge
                        </label>
                        <input
                          type="text"
                          id="serviceFee"
                          value={item.serviceFee}
                          onChange={handleChange}
                          placeholder="Enter new service Fee"
                          required
                        />
                      </div>
                    </div>
                    <div className="fields" style={{ marginBottom: "1rem" }}>
                      <div
                        className="input-fields"
                        style={{ margin: "0 auto" }}
                      >
                        <label for="" style={{ fontSize: "1.2rem" }}>
                          Base Fare
                        </label>
                        <input
                          type="text"
                          id="baseFare"
                          value={item.baseFare}
                          onChange={handleChange}
                          placeholder="Enter new Base Fare"
                          required
                        />
                      </div>
                    </div>
                    <div className="fields" style={{ marginBottom: "1rem" }}>
                      <div
                        className="input-fields"
                        style={{ margin: "0 auto" }}
                      >
                        <label for="" style={{ fontSize: "1.2rem" }}>
                          Custom Packaging
                        </label>
                        <input
                          type="text"
                          id="customPackaging"
                          value={item.customPackaging}
                          onChange={handleChange}
                          placeholder="Enter Custom Packaging Charges"
                          required
                        />
                      </div>
                    </div>
                    <div className="fields" style={{ marginBottom: "1rem" }}>
                      <div
                        className="input-fields"
                        style={{ margin: "0 auto" }}
                      >
                        <label for="" style={{ fontSize: "1.2rem" }}>
                          Distance Fee
                        </label>
                        <input
                          type="text"
                          id="distanceFee"
                          value={item.distanceFee}
                          onChange={handleChange}
                          placeholder="Enter new Distance Fee"
                          required
                        />
                      </div>
                    </div>
                    <div className="fields" style={{ marginBottom: "1rem" }}>
                      <div
                        className="input-fields"
                        style={{ margin: "0 auto" }}
                      >
                        <label for="" style={{ fontSize: "1.2rem" }}>
                          Distance Fee
                        </label>
                        <input
                          type="text"
                          id="customdistanceFee"
                          value={item.customdistanceFee}
                          onChange={handleChange}
                          placeholder="Enter new Distance Fee"
                          required
                        />
                      </div>
                    </div>
                    <button
                      className="nextbtn btn-success"
                      type="submit"
                      style={{
                        marginLeft: "15.5rem",
                        fontSize: "1.2rem",
                        padding: "0.5rem",
                        borderRadius: "15px",
                      }}
                    >
                      Send Email to he user
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCharges;
