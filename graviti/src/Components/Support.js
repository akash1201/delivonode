import { React, useState, useEffect } from "react";
import TopNav from "./TopNav";
import SideNav from "./sideNav";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Support() {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [help, setHelp] = useState({
    phoneNo: "",
    message: "",
  });
  const helper = (e) => {
    setHelp({ ...help, [e.target.id]: e.target.value });
  };
  const handleSupport = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(help);
    await axios.post(`/api/stores/support`, help, config);
  };
  useEffect(async () => {
    if (!userInfo) {
      history("/login");
    }
  }, []);
  const redirect = async (e) => {
    e.preventDefault();
    history("/product");
  };
  return (
    <div>
      <TopNav />
      <div className="main">
        <SideNav />
        <div
          className="modal fade"
          id="exampleModalLong"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Write us your queries
                </h5>

                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={redirect}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSupport}>
                  <div className="form-group">
                    <label for="">
                      <i className="fa-2x fa-bold fa-mobile-screen-button"></i>
                      Mobile Number:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="phoneNo"
                      value={help.phoneNo}
                      onChange={helper}
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <label for="">
                      <i className="fa-2x fa-solid fa-message-pen"></i>
                      <p style={{ fontSize: "large" }}>Your Message:</p>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="message"
                      value={help.message}
                      onChange={helper}
                      required="required"
                    />
                  </div>
                  <button type="submit" className="support_btn">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
