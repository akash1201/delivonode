import { React, useState, useEffect } from "react";
import "./Otp.css";
import boy from "./deliveryboy.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Verifyotp() {
  const mynum = localStorage.getItem("numInfo");
  const history = useNavigate();
  const [verify, setVerify] = useState("");
  const verifyChange = (e) => {
    setVerify(e.target.value);
  };
  const [phoneNo, setPhoneNo] = useState(parseInt(mynum));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/users/verifymyOtp`,
      { verify, phoneNo },
      config
    );
    setTimeout(() => {
      if (data == "OTP Verified") {
        history("/login");
      }
    }, 4000);
  };
  return (
    <div className="wrapper_otp">
      <div className="title_otp">
        Enter verification Code <br /> We've Sent on given number
      </div>
      <img src={boy} alt="" className="body-img_otp" />
      <div className="form_verify">
        <h2>ENTER VERIFICATION CODE</h2>
        <input
          className="verify_input"
          type="text"
          placeholder="Enter the verification Code"
          value={verify}
          onChange={verifyChange}
        />

        <div className="left-right">
          <h3>18 Sec</h3>
          <h3>Resend</h3>
        </div>
        <div className="button">
          <button
            type="submit"
            style={{
              backgroundColor: "#93f037",
              fontSize: "3rem",
              border: "none",
              width: "100%",
            }}
            onClick={handleSubmit}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verifyotp;
