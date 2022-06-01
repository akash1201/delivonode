import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction, registerAction } from "../actions/userActions";

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
      history("/order");
    }, 2000);
  };

  return (
    <div className="wrapper9">
      <div className="title">Login </div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            id="email"
            value={data.email}
            onChange={handleChange}
            required
            placeholder="Enter Email Address"
          />
        </div>
        <div className="field">
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            required
            placeholder="Enter Password"
          />
        </div>
        <div className="pass-link">
          <a href="#">Forget Password?</a>
        </div>
        <div className="field">
          <button className="nextbtn" type="submit">
            Login
          </button>
        </div>
      </form>
      <div className="wrapper_signup">
        <h3>Don't have an account ?</h3>
        <Link
          to="/register"
          style={{
            color: "#93f037",
            border: "none",
            fontSize: "1.5rem",
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
