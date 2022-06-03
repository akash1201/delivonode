import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction, registerAction } from "../userActions";

function Login() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(data.email, data.password));
    setTimeout(() => {
      history("/VendorDetails");
    }, 2000);
  };

  return (
    <div className="container1">
      <header>Login</header>
      <form onSubmit={handleSubmit}>
        <div className="form first">
          <div className="details personal">
            <span className="title">Personal Details</span>
            <div className="fields">
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
            </div>

            <button className="nextbtn" type="submit">
              <span className="btnText">Next</span>
              <i className="uil uil-navigator"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
