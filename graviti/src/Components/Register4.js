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
    confirmaccountNo: registerinfo.confirmaccountNo,
    ifsc: registerinfo.ifsc,
    upiId: registerinfo.upiId,
    cancelledCheque: registerinfo.cancelledCheque,
    openingTime: registerinfo.openingTime,
    closingTime: registerinfo.closingTime,
    licenseType: registerinfo.licenseType,
    storeImage: registerinfo.storeImage,
    terms: false,
    policy: false,
    whatsappUpdate: false,
    active: false,
  });
  const getBack = async (e) => {
    history("/register3");
  };
  const [btnColor, setBtnColor] = useState("red");
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
          licenseType: data.licenseType,
          categories: data.categories,
          active: data.active,
          gst: data.gst,
          email: data.email,
          storeImage: data.storeImage,
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
      setBtnColor("green");
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
        <div className="form forth">
          <div className="details personal">
            <div className="fields">
              <div style={{ fontSize: "1.7rem" }}>
                <h2>Company Policy</h2>
                <p>
                  You shall not have more than one active Account (as defined
                  hereinafter) on the Platform. Additionally, You are prohibited
                  from selling, trading, or otherwise transferring Your Account
                  to another party.
                </p>
                <br />
                <h2>Terms & Conditions</h2>
                <p>
                  These terms of use ("Terms of Use") mandate the terms on which
                  users ("You" or "Your" or "Yourself" or "Users") interested in
                  browsing or availing GravityBites Services (defined below),
                  and accessing the platform www.GravityBites.in and the mobile
                  application owned and operated by GravityBites sole Proprietor
                  ("GravityBites") collectively referred to as, the "Platform"
                  connects with the merchants registered on the Platform
                  ("Tied-up Merchants"), merchants not registered on the
                  Platform ("Non-tied up Merchants") (together hereinafter
                  referred to as "Merchants") and with delivery partners
                  ("Delivery Partners") to avail the GravityBites Services.
                  Please read the Terms of Use carefully before using the
                  Platform or registering on the Platform or accessing any
                  material or information through the Platform. By clicking on
                  the "I Accept" button, You accept this Terms of Use and agree
                  to be legally bound by the same. Use of and access to the
                  Platform is offered to You upon the condition of acceptance of
                  all the terms, conditions and notices contained in this Terms
                  of Use and Privacy Policy, along with any amendments made by
                  GravityBites at its sole discretion and posted on the Platform
                  from time to time. For the purposes of these Terms of Use, the
                  term 'GravityBites' or 'Us' or 'We' refers to GravityBites
                  Digital Private Limited. The term 'You' refers to the user or
                  visitor of the Website and/or App. When You use our services,
                  You will be subject to the terms, guidelines and policies
                  applicable to such service and as set forth in these Terms of
                  Use. As long as you comply with these Terms of Use, We grant
                  You a personal, non-exclusive, non-transferable, limited
                  privilege to enter and use our Platforms and services.
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
              <button
                type="button"
                className="btn-danger"
                onClick={getBack}
                style={{ backgroundColor: "red" }}
              >
                <span className="btnText">Back</span>
                <i className="uil uil-navigator"></i>
              </button>
              <button
                className="btn-success"
                type="submit"
                style={{ backgroundColor: btnColor }}
              >
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
