import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register2() {
  const history = useNavigate();
  const registerinfo = localStorage.getItem("registerinfo")
    ? JSON.parse(localStorage.getItem("registerinfo"))
    : "";
  const [data, setData] = useState({
    fullName: registerinfo.fullName,
    email: registerinfo.email,
    password: registerinfo.password,
    confirmpassword: registerinfo.confirmpassword,
    phoneNo: registerinfo.phoneNo,
    storeName: registerinfo.storeName,
    storeManager: registerinfo.storeManager,
    countryCode: registerinfo.countryCode,
    stateCode: registerinfo.stateCode,
    zipcode: registerinfo.zipcode,
    streetName: registerinfo.streetName,
    streetNumber: registerinfo.streetNumber,
    city: registerinfo.city,
    categories: registerinfo.categories,
    services: registerinfo.services,
    openingTime: registerinfo.openingTime,
    closingTime: registerinfo.closingTime,
    latitude: registerinfo.latitude,
    longitude: registerinfo.longitude,
    storeImage: registerinfo.storeImage,
    uploadPan: "",
    uploadGSTcertificate: "",
    uploadMenu: "",
    panNo: "",
    liscenseNo: "",
    licenseType: "",
    licenseImage: "",
    expiryDate: "",
    gst: "",
  });
  const getBack = async (e) => {
    history("/map");
  };

  const handleChange = (e) => {
    if (e.target.id === "uploadPan") {
      console.log(e.target.files, "3");
      setData({ ...data, [e.target.id]: e.target.files[0] });
    } else if (e.target.id === "uploadGSTcertificate") {
      console.log(e.target.files, "4");
      setData({ ...data, [e.target.id]: e.target.files[0] });
    } else if (e.target.id === "uploadMenu") {
      console.log(e.target.files, "5");
      setData({ ...data, [e.target.id]: e.target.files[0] });
    } else if (e.target.id === "licenseImage") {
      console.log(e.target.files, "6");
      setData({ ...data, [e.target.id]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("registerinfo", JSON.stringify(data));
    setBtnColor("#93f037");
    setTimeout(() => {
      history("/register3");
    }, 2000);
  };
  const [btnColor, setBtnColor] = useState("grey");
  const [imageColor, setImageColor] = useState({
    menu: "grey",
    pan: "grey",
    gst: "grey",
    license: "grey",
  });
  return (
    <div className="container1">
      <header>Dcouments</header>
      <form onSubmit={handleSubmit}>
        <div className="form Third">
          <div className="details personal">
            {/* <span className="title">Store Details</span> */}
            <div className="fields">
              <div className="input-fields">
                <h4 style={{ fontWeight: "500" }}>
                  {data.categories == "Foods Beverages"
                    ? "Select Fssai License"
                    : ""}
                </h4>
                <h4 style={{ fontWeight: "500" }}>
                  {data.categories == "Pharma Medicine"
                    ? "Select Pharmacy License"
                    : ""}
                </h4>
                <label for="services">License Type</label>
                <select
                  name="services"
                  id="licenseType"
                  value={data.licenseType}
                  onChange={handleChange}
                  className="options"
                  style={{
                    height: "4.5rem",
                    borderRadius: "5px",
                    fontSize: "2rem",
                    padding: "0.5rem",
                  }}
                >
                  <option value="volvo"> Select </option>

                  <option value="Only Delivery">FSSAI</option>
                  <option value="Only Takeaway">Pharmacy</option>
                  <option value="All Services">Other</option>
                </select>
              </div>
              <div className="input-fields">
                <label for="">Expiry Date</label>
                <input
                  type="date"
                  id="expiryDate"
                  value={data.expiryDate}
                  onChange={handleChange}
                  placeholder="License Expiry Date"
                  required
                />
              </div>
              <div className="input-fields">
                <label for="">License Number</label>
                <input
                  type="text"
                  id="liscenseNo"
                  value={data.liscenseNo}
                  onChange={handleChange}
                  placeholder="Enter License Number"
                  required
                />
              </div>

              <div className="input-fields">
                <label for="">License Image</label>
                <input
                  type="file"
                  id="licenseImage"
                  name="image"
                  onChange={handleChange}
                  placeholder=""
                  required="required"
                />
                <button
                  type="button"
                  className="btn-success"
                  style={{ backgroundColor: imageColor.license }}
                  onClick={async () => {
                    const formData8 = new FormData();
                    // Update the formData object
                    formData8.append("image", data.licenseImage);
                    // setData({ ...data, [e.target.id]: e.target.files[0] });
                    const config = {
                      headers: {
                        contentType: "multipart/form-data",
                      },
                    };
                    const imagedata8 = await axios.post(
                      `/api/upload/`,
                      formData8,
                      config
                    );
                    setImageColor({ ...imageColor, license: "#93f037" });
                    setData({
                      ...data,
                      licenseImage: imagedata8.data.imagedata,
                    });
                  }}
                >
                  Upload
                </button>
              </div>

              <div className="input-fields">
                <label for="">PAN Card</label>
                <input
                  type="text"
                  id="panNo"
                  value={data.panNo}
                  onChange={handleChange}
                  placeholder="Enter PAN No."
                  required="required"
                />
              </div>

              <div className="input-fields">
                <label for="">Image of PAN card (Front)</label>
                <input
                  type="file"
                  id="uploadPan"
                  name="image"
                  onChange={handleChange}
                  placeholder=""
                  required="required"
                />
                <button
                  type="button"
                  className="btn-success"
                  style={{ backgroundColor: imageColor.pan }}
                  onClick={async () => {
                    const formData4 = new FormData();
                    // Update the formData object
                    formData4.append("image", data.uploadPan);
                    // setData({ ...data, [e.target.id]: e.target.files[0] });
                    const config = {
                      headers: {
                        contentType: "multipart/form-data",
                      },
                    };
                    const imagedata4 = await axios.post(
                      `/api/upload/`,
                      formData4,
                      config
                    );
                    setImageColor({ ...imageColor, pan: "#93f037" });
                    setData({
                      ...data,
                      uploadPan: imagedata4.data.imagedata,
                    });
                  }}
                >
                  Upload
                </button>
              </div>

              <div className="input-fields">
                <label for="">
                  GST Number{" "}
                  <h6> ( Applicable if store turnover above 20 Lakh)</h6>
                </label>
                <input
                  type="text"
                  id="gst"
                  value={data.gst}
                  onChange={handleChange}
                  placeholder="Enter GST Number"
                  required="required"
                />
              </div>
              {/* GST Certificate */}
              <div className="input-fields">
                <label for="">Upload GST Certificate</label>
                <input
                  type="file"
                  id="uploadGSTcertificate"
                  name="image"
                  onChange={handleChange}
                  placeholder=""
                  required="required"
                />
                <button
                  type="button"
                  className="btn-success"
                  style={{ backgroundColor: imageColor.gst }}
                  onClick={async () => {
                    const formData5 = new FormData();
                    // Update the formData object
                    formData5.append("image", data.uploadGSTcertificate);
                    // setData({ ...data, [e.target.id]: e.target.files[0] });
                    const config = {
                      headers: {
                        contentType: "multipart/form-data",
                      },
                    };
                    const imagedata5 = await axios.post(
                      `/api/upload/`,
                      formData5,
                      config
                    );
                    setImageColor({ ...imageColor, gst: "#93f037" });
                    setData({
                      ...data,
                      uploadGSTcertificate: imagedata5.data.imagedata,
                    });
                  }}
                >
                  Upload
                </button>
              </div>
              <div className="input-fields">
                <label for="">Upload Product Menu</label>
                <input
                  type="file"
                  id="uploadMenu"
                  name="image"
                  onChange={handleChange}
                  placeholder=""
                  required="required"
                />
                <button
                  type="button"
                  className="btn-success"
                  style={{ backgroundColor: imageColor.menu }}
                  onClick={async () => {
                    const formData1 = new FormData();
                    // Update the formData object
                    formData1.append("image", data.uploadMenu);
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
                    setImageColor({ ...imageColor, menu: "#93f037" });
                    setData({
                      ...data,
                      uploadMenu: imagedata1.data.imagedata,
                    });
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
            <div className="buttons">
              <button
                className="backbtn"
                onClick={getBack}
                style={{ backgroundColor: "red" }}
              >
                <span className="btnText">Back</span>
                <i className="uil uil-navigator"></i>
              </button>

              <button
                className="nextbtn"
                type="submit"
                style={{ backgroundColor: btnColor }}
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

export default Register2;
