import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register3() {
  const history = useNavigate();
  const registerinfo = localStorage.getItem("registerinfo")
    ? JSON.parse(localStorage.getItem("registerinfo"))
    : "";
  const getBack = async (e) => {
    history("/register2");
  };
  const [data, setData] = useState({
    fullName: registerinfo.fullName,
    email: registerinfo.email,
    phoneNo: registerinfo.phoneNo,
    password: registerinfo.password,
    confirmpassword: registerinfo.confirmpassword,
    storeName: registerinfo.storeName,
    storeManager: registerinfo.storeManager,
    countryCode: registerinfo.countryCode,
    stateCode: registerinfo.stateCode,
    zipcode: registerinfo.zipcode,
    streetName: registerinfo.streetName,
    streetNumber: registerinfo.streetNumber,
    city: registerinfo.city,
    categories: registerinfo.categories,
    openingTime: registerinfo.openingTime,
    closingTime: registerinfo.closingTime,
    services: registerinfo.services,
    uploadMenu: registerinfo.uploadMenu,
    latitude: registerinfo.latitude,
    longitude: registerinfo.longitude,
    panNo: registerinfo.panNo,
    uploadPan: registerinfo.uploadPan,
    uploadGSTcertificate: registerinfo.uploadGSTcertificate,
    liscenseNo: registerinfo.liscenseNo,
    gst: registerinfo.gst,
    licenseType: registerinfo.licenseType,
    storeImage: registerinfo.storeImage,
    licenseImage: registerinfo.licenseImage,
    expiryDate: registerinfo.expiryDate,
    bankName: "",
    accountHolder: "",
    accountNo: "",
    confirmaccountNo: "",
    ifsc: "",
    upiId: "",
    cancelledCheque: "",
  });

  const handleChange = (e) => {
    if (e.target.id === "cancelledCheque") {
      console.log(e.target.files, "1");
      setData({ ...data, [e.target.id]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.id]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("registerinfo", JSON.stringify(data));
    setBtnColor("#93f037");
    setTimeout(() => {
      history("/register4");
    }, 2000);
  };
  const [btnColor, setBtnColor] = useState("grey");
  const [imageColor, setImageColor] = useState("grey");
  return (
    <div className="container1">
      <header>Bank Details</header>
      <form onSubmit={handleSubmit}>
        <div className="form forth">
          <div className="details personal">
            {/* <span className="title">Bank Details</span> */}
            <div className="fields">
              <div className="input-fields">
                <label for="">Bank Name</label>
                <input
                  type="text"
                  id="bankName"
                  value={data.bankName}
                  onChange={handleChange}
                  placeholder="Enter Your Bank Name"
                  required="required"
                />
              </div>
              <div className="input-fields">
                <label for="">Account Holder Name</label>
                <input
                  type="text"
                  id="accountHolder"
                  value={data.accountHolder}
                  required="required"
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                />
              </div>

              <div className="input-fields">
                <label for="">Account Number</label>
                <input
                  type="number"
                  placeholder="Enter Your account no"
                  id="accountNo"
                  value={data.accountNo}
                  required="required"
                  onChange={handleChange}
                />
              </div>
              <div className="input-fields">
                <label for="">Confirm Account Number</label>
                <input
                  type="number"
                  placeholder="Enter Your account no"
                  id="confirmaccountNo"
                  value={data.confirmaccountNo}
                  required="required"
                  onChange={handleChange}
                />
                {data.accountNo === data.confirmaccountNo
                  ? null
                  : "Account No doesn't match"}
              </div>
              <div className="input-fields">
                <label for="">IFSC Code</label>
                <input
                  type="text"
                  placeholder="Enter IFSC Code"
                  id="ifsc"
                  value={data.ifsc}
                  required="required"
                  onChange={handleChange}
                />
              </div>

              <div className="input-fields">
                <label for="">UPI Id (Optional)</label>
                <input
                  type="text"
                  id="upiId"
                  value={data.upiId}
                  onChange={handleChange}
                  placeholder="Enter UPI Id"
                />
              </div>

              {/* check this */}
              <div className="input-fields">
                <label for="">Upload (Passbook or Cancel Cheque)</label>
                <input
                  type="file"
                  id="cancelledCheque"
                  onChange={handleChange}
                  placeholder="Upload passbook/cancelled cheque"
                  required
                />
                <button
                  type="button"
                  className="btn-success"
                  style={{ backgroundColor: imageColor }}
                  onClick={async () => {
                    const formData1 = new FormData();
                    // Update the formData object
                    formData1.append("image", data.cancelledCheque);
                    // setData({ ...data, [e.target.id]: e.target.files[0] });
                    const config = {
                      headers: {
                        contentType: "multipart/form-data",
                      },
                    };
                    const imagedata1 = await axios.post(
                      `/api/upload/`,
                      formData1,
                      config
                    );
                    setImageColor("#93f037");
                    setData({
                      ...data,
                      cancelledCheque: imagedata1.data.imagedata,
                    });
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
            <div className="buttons">
              <button
                className="nextbtn"
                onClick={getBack}
                style={{ backgroundColor: "grey" }}
              >
                <span className="btnText">Back</span>
                <i className="uil uil-navigator"></i>
              </button>
              <button
                className="nextbtn"
                style={{ backgroundColor: btnColor }}
                type="submit"
                disabled={!(data.accountNo === data.confirmaccountNo)}
              >
                <span className="btnText">Next</span>
                <i className="uil uil-navigator"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register3;
