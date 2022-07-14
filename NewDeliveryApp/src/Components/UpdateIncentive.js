import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "./SideNav";
import Header from "./Header.js";
import axios from "axios";

function UpdateIncentives() {
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
    const { data } = await axios.post(
      `/api/admin/updateIncentives`,
      item,
      config
    );
  };

  const [item, setItem] = useState({
    incentiveTen1: "",
    incentiveTen2: "",
    incentiveTen3: "",
    incentiveTen4: "",
    incentiveTen5: "",
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
                          Enter Incentive for user delivering less than 10
                          deliveries
                        </label>
                        <input
                          type="text"
                          id="incentiveTen1"
                          value={item.incentiveTen1}
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
                          Enter Incentive for user delivering between (10-20)
                          deliveries
                        </label>
                        <input
                          type="text"
                          id="incentiveTen2"
                          value={item.incentiveTen2}
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
                          Enter Incentive for user delivering between (20-30)
                          deliveries
                        </label>
                        <input
                          type="text"
                          id="incentiveTen3"
                          value={item.incentiveTen3}
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
                          Enter Incentive for user delivering between (30-40)
                          deliveries
                        </label>
                        <input
                          type="text"
                          id="incentiveTen4"
                          value={item.incentiveTen4}
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
                          Enter Incentive for user delivering more than 50
                          deliveries
                        </label>
                        <input
                          type="text"
                          id="incentiveTen5"
                          value={item.incentiveTen5}
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
                      Update-Incentives
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

export default UpdateIncentives;
