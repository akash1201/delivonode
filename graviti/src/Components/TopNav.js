import { React } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../actions/userActions";

function TopNav() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    if (userInfo) {
      dispatch(logoutAction());
      history("/");
    }
  };
  return (
    <div className="topnav">
      {/* <Link className="activee hamburger" to="/wallet">
        <i className="fa-solid fa-fw fa-wallet"></i>Burger
      </Link> */}
      <Link className="activee" to="/map">
        <i className="fa-solid fa-fw fa-wallet"></i>Wallet
      </Link>
      <Link
        className="activee"
        to="/support"
        data-toggle="modal"
        data-target="#exampleModalLong"
      >
        <i className="fa-solid fa-fw fa-wallet"></i>Help
      </Link>
      <Link className="activee" to="/">
        <i className="fa-solid fa-fw fa-wallet"></i>
        <button
          onClick={handleLogout}
          style={{
            border: "none",
            background: "#eeeee4",
          }}
        >
          Logout
        </button>
      </Link>
    </div>
  );
}

export default TopNav;
