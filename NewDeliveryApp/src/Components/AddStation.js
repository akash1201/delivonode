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
    const { data } = await axios.post(`/api/admin/addStation`, item, config);
  };

  const [item, setItem] = useState({
    city: "",
    stationCode: "",
    lat: "",
    long: "",
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
                      Add New City
                    </span>
                    <div className="fields" style={{ marginBottom: "1rem" }}>
                      <div
                        className="input-fields"
                        style={{ margin: "0 auto" }}
                      >
                        <label for="" style={{ fontSize: "1.2rem" }}>
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={item.city}
                          onChange={handleChange}
                          placeholder="Enter City Name"
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
                          Station Code
                        </label>
                        <input
                          type="text"
                          id="stationCode"
                          value={item.stationCode}
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
                          Latitude
                        </label>
                        <input
                          type="text"
                          id="lat"
                          value={item.lat}
                          onChange={handleChange}
                          placeholder="Enter latittude of location"
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
                          Longitude
                        </label>
                        <input
                          type="text"
                          id="long"
                          value={item.long}
                          onChange={handleChange}
                          placeholder="Enter Longitude of location"
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
                      Submit
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
