import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction, registerAction } from "../actions/userActions";

function Register4() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo: registerInfo } = userRegister;
  const registerinfo = localStorage.getItem("registerinfo")
    ? JSON.parse(localStorage.getItem("registerinfo"))
    : "";
  useEffect(() => {
    console.log(registerinfo);
  }, []);

  const [data, setData] = useState({
    fullName: registerinfo.fullName,
    email: registerinfo.email,
    phoneNo: registerinfo.phoneNo,
    password: registerinfo.password,
    confirmpassword: registerinfo.confirmpassword,
    storeName: registerinfo.storeName,
    storeManager: registerinfo.storeManager,
    vendorType: registerinfo.vendorType,
    countryCode: registerinfo.countryCode,
    stateCode: registerinfo.stateCode,
    zipcode: registerinfo.zipcode,
    streetName: registerinfo.streetName,
    streetNumber: registerinfo.streetNumber,
    city: registerinfo.city,
    categories: registerinfo.categories,
    services: registerinfo.services,
    uploadMenu: registerinfo.uploadMenu,
    latitude: registerinfo.latitude,
    longitude: registerinfo.longitude,
    panNo: registerinfo.panNo,
    uploadPan: registerinfo.uploadPan,
    uploadGSTcertificate: registerinfo.uploadGSTcertificate,
    liscenseNo: registerinfo.liscenseNo,
    gst: registerinfo.gst,
    bankName: registerinfo.bankName,
    accountHolder: registerinfo.accountHolder,
    accountNo: registerinfo.accountNo,
    ifsc: registerinfo.ifsc,
    upiId: registerinfo.upiId,
    cancelledCheque: registerinfo.cancelledCheque,
    openingTime: registerinfo.openingTime,
    closingTime: registerinfo.closingTime,
    terms: false,
    policy: false,
    whatsappUpdate: false,
    active: false,
  });
  const getBack = async (e) => {
    history("/register3");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.terms && data.policy) {
      dispatch(
        registerAction({
          storeName: data.storeName,
          fullName: data.fullName,
          phoneNo: data.phoneNo,
          address: {
            city: data.city,
            countryCode: data.countryCode,
            stateCode: data.stateCode,
            zipcode: data.zipcode,
            streetName: data.streetName,
            streetNumber: data.streetNumber,
            latitude: data.latitude,
            longitude: data.longitude,
          },
          services: data.services,
          categories: data.categories,
          active: data.active,
          gst: data.gst,
          email: data.email,
          liscenseNo: data.liscenseNo,
          ownerPan: data.panNo,
          bankName: data.bankName,
          accountHolder: data.accountHolder,
          accountNo: data.accountNo,
          ifsc: data.ifsc,
          vendorType: data.vendorType,
          upiId: data.upiId,
          storeManager: data.storeManager,
          whatsappUpdate: data.whatsappUpdate,
          openingTime: data.openingTime,
          closingTime: data.closingTime,
          terms: data.terms,
          policy: data.policy,
          password: data.password,
          uploadPan: data.uploadPan,
          uploadGSTcertificate: data.uploadGSTcertificate,
          uploadMenu: data.uploadMenu,
          cancelledCheque: data.cancelledCheque,
        })
      );
      setTimeout(() => {
        history("/register5");
      }, 2000);
    } else {
      console.log("Please Agree to terms and Conditions");
    }
  };
  return (
    <div className="container1">
      <header>Terms of Use</header>
      <form onSubmit={handleSubmit}>
        <section className="step-wizard">
          <ul className="step-wizard-list">
            <li className="step-wizard-item current-item">
              <span className="progress-count">1</span>
              <span className="progress-label">Pesonal Details</span>
            </li>
            <li className="step-wizard-item current-item">
              <span className="progress-count">2</span>
              <span className="progress-label">Store Details</span>
            </li>
            <li className="step-wizard-item  current-item">
              <span className="progress-count">3</span>
              <span className="progress-label">Store Details</span>
            </li>
            <li className="step-wizard-item current-item">
              <span className="progress-count">4</span>
              <span className="progress-label">Bank Details</span>
            </li>
            <li className="step-wizard-item ">
              <span className="progress-count">5</span>
              <span className="progress-label">Terms of Use</span>
            </li>
          </ul>
        </section>
        <div className="form forth">
          <div className="details personal">
            <span className="title">Terms & Conditions</span>
            <div className="fields">
              <div>
                <h2>Company Policy</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
                <br />
                <h2>Terms of Use</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book.
                </p>
              </div>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={data.terms}
                  onClick={() => {
                    setData({
                      ...data,
                      terms: !data.terms,
                    });
                  }}
                  required="required"
                />
                Terms & Conditions
                <br />
                <input
                  type="checkbox"
                  id="policy"
                  checked={data.policy}
                  onClick={() => {
                    setData({
                      ...data,
                      policy: !data.policy,
                    });
                  }}
                  required="required"
                />{" "}
                Company Policy
                <br />
                <input
                  type="checkbox"
                  id="active"
                  checked={data.active}
                  onClick={() => {
                    setData({
                      ...data,
                      active: !data.active,
                    });
                  }}
                  required="required"
                />
                Status Active
                <br />
                <input
                  type="checkbox"
                  id="whatsappUpdate"
                  checked={data.whatsappUpdate}
                  onClick={() => {
                    setData({
                      ...data,
                      whatsappUpdate: !data.whatsappUpdate,
                    });
                  }}
                  required="required"
                />
                Whatsapp Update
                <br />
              </div>
            </div>
            <div className="buttons">
              <button className="nextbtn" onClick={getBack}>
                <span className="btnText">Back</span>
                <i className="uil uil-navigator"></i>
              </button>
              <button className="nextbtn" type="submit">
                <span className="btnText">Submit</span>
                <i className="uil uil-navigator"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register4;
