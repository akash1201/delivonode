import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../userActions";
import "./login.css";

function Register() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo: registerInfo } = userRegister;
  const [detail, setDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
  });

  const handleChange = (e) => {
    setDetail({ ...detail, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerAction({
        firstName: detail.firstName,
        lastName: detail.lastName,
        email: detail.email,
        phoneNo: detail.phoneNo,
        password: detail.password,
      })
    );
  };
  return (
    <div class="container">
      <header>Registration</header>
      <form onSubmit={handleSubmit}>
        <div class="form first">
          <div class="details personal">
            <span class="title">Personal Details</span>
            <div class="fields">
              <div class="input-fields">
                <label for="">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={detail.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  required
                />
              </div>

              <div class="input-fields">
                <label for="">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={detail.lasttName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  required
                />
              </div>

              <div class="input-fields">
                <label for="">Email Id</label>
                <input
                  type="email"
                  id="email"
                  value={detail.email}
                  onChange={handleChange}
                  placeholder="Enter Email Id"
                  required
                />
              </div>

              <div class="input-fields">
                <label for="">Password </label>
                <input
                  type="password"
                  id="password"
                  value={detail.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  required
                />
              </div>

              <div class="input-fields">
                <label for="">Mobile Number</label>
                <input
                  type="number"
                  id="phoneNo"
                  value={detail.phoneNo}
                  onChange={handleChange}
                  placeholder="Enter Your Mobile Number"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div class="buttons">
          <button class="nextbtn" type="submit">
            <span class="btnText">Submit</span>
            <i class="uil uil-navigator"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
