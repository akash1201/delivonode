import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const history = useNavigate();
  const [btnColor, setBtnColor] = useState("grey");
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.phoneNo.length == "10") {
      localStorage.setItem("registerinfo", JSON.stringify(data));
      setBtnColor("#93f037");
      setTimeout(() => {
        history("/register1");
      }, 2000);
    }
  };

  return (
    <div className="container1">
      <header>Personal Details</header>
      <form onSubmit={handleSubmit}>
        <div className="form first">
          <div className="details personal">
            {/* <span className="title">Personal Details</span> */}
            <div className="fields">
              <div className="input-fields">
                <label for="">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  id="fullName"
                  value={data.fullName}
                  onChange={handleChange}
                  required="required"
                />
              </div>
              <div className="input-fields">
                <label for="">Email Id</label>
                <input
                  type="text"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email Id"
                  required="required"
                />
              </div>

              <div className="input-fields">
                <label for="">Mobile Number</label>
                <input
                  type="number"
                  id="phoneNo"
                  minLength="10"
                  maxLength="10"
                  value={data.phoneNo}
                  onChange={handleChange}
                  placeholder="Enter Your Mobile Number"
                  required
                />
                {data.phoneNo.length == "10"
                  ? null
                  : "Enter a 10-digit mobile number"}
              </div>
              <div className="input-fields">
                <label for="">Password </label>
                <input
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  required="required"
                />
              </div>
              <div className="input-fields">
                <label for="">Confirm Password </label>
                <input
                  type="password"
                  id="confirmpassword"
                  value={data.confirmpassword}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  required="required"
                />
                {data.confirmpassword === data.password
                  ? null
                  : "Password doesn't match"}
              </div>
            </div>

            <button
              type="submit"
              disabled={
                !(data.password === data.confirmpassword) ||
                data.phoneNo.length === "10"
              }
              style={{ backgroundColor: btnColor }}
            >
              <span className="btnText">Next</span>
              <i className="uil uil-navigator"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
