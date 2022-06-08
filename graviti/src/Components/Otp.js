import { React, useState } from "react";
import "./Otp.css";
import logo from "./assets/img/ravity.png";
import boy from "./deliveryboy.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Otp() {
  const history = useNavigate();
  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;
  const [num, setNum] = useState("");
  const numChange = (e) => {
    setNum(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("numInfo", JSON.stringify(parseInt(num)));
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/users/sendmyOtp`, { num }, config);

    setTimeout(() => {
      history("/verifyotp");
    }, 2000);
  };
  return (
    <div className="wrapper_otp">
      <img src={logo} className="logo_otp" />
      <img src={boy} alt="" className="body-img_otp" />
      <div className="form">
        <div className="field_otp">
          <input
            type="text"
            placeholder="+91  Enter Mobile Number"
            value={num}
            onChange={numChange}
          />

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#93f037",
              fontSize: "3rem",
              border: "none",
              width: "100%",
            }}
            type="submit"
          >
            Continue
          </button>
        </div>
      </div>
      <div className="links">
        <center>
          <span className="p-para">Or</span>
        </center>
        <button
          type="button"
          style={{
            backgroundColor: "#00008b",
            fontSize: "2rem",
            border: "none",
            width: "100%",
          }}
        >
          Continue With Facebook
        </button>

        <button
          type="button"
          style={{
            backgroundColor: "white",
            fontSize: "2rem",
            border: "none",
            width: "100%",
          }}
        >
          Continue With Google
        </button>
      </div>
    </div>
  );
}

export default Otp;
