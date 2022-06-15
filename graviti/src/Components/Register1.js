import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

function Register1() {
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
    latitude: "",
    longitude: "",
    openingTime: "",
    closingTime: "",
    countryCode: "",
    stateCode: "",
    zipcode: "",
    streetName: "",
    streetNumber: "",
    city: "",
    categories: "",
    services: "",
    storeManager: "",
    storeName: "",
    storeImage: "",
  });
  const [mapdata, setMapdata] = useState({ lat: 28.6139, lng: 77.209 });
  const defaultCenter = {
    lat: 28.6139,
    lng: 77.209,
  };
  const mapStyles = {
    height: "80%",
    width: "100%",
  };
  const success = (position) => {
    setMapdata({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCUp07QM56rvYC1gKmRnAIDAZQKKq5w2hc`
      )
      .then((res) => {
        console.log(res.data.results[1]);
      });
  };

  const getBack = async (e) => {
    history("/register");
  };

  const handleChange = (e) => {
    if (e.target.id === "storeImage") {
      console.log(e.target.files, "1");
      setData({ ...data, [e.target.id]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.id]: e.target.value });
    }
  };
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(success);
  // }, []);
  const detectLocation = () => {
    setDetectColor("#93f037");
    navigator.geolocation.getCurrentPosition(success);
  };

  const onMarkerDragEnd = (e) => {
    setMapdata({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    console.log(e.latLng.lat(), e.latLng.lng());
  };
  useEffect(() => {
    localStorage.setItem("registerinfo", JSON.stringify(data));

    // history("/register2");
  }, [data]);

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (data.zipcode.length == "6") {
      setData({ ...data, latitude: mapdata.lat, longitude: mapdata.lng });
      setBtnColor("#93f037");
      setTimeout(() => {
        history("/register2");
      }, 2000);
    }
  };
  const [btnColor, setBtnColor] = useState("grey");
  const [imageColor, setImageColor] = useState("grey");
  const [detectColor, setDetectColor] = useState("grey");

  return (
    <div className="container1">
      <header>Store Details</header>
      <form>
        <div className="form second">
          <div className="details personal">
            <div className="fields">
              <div className="input-fields">
                <label for="">Store Name</label>
                <input
                  type="text"
                  id="storeName"
                  value={data.storeName}
                  onChange={handleChange}
                  placeholder="Enter Store Name"
                  required="required"
                />
              </div>
              <div className="input-fields">
                <label for="">Who Manages the Store?</label>
                <input
                  type="text"
                  id="storeManager"
                  value={data.storeManager}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="input-fields">
                <label for="">Opening Time</label>
                <input
                  type="time"
                  min="8:00"
                  max="12:00"
                  id="openingTime"
                  value={data.openingTime}
                  onChange={handleChange}
                  placeholder="Store Opening Time"
                  required="required"
                />
              </div>
              <div className="input-fields">
                <label for="">Closing Time</label>
                <input
                  type="time"
                  min="19:00"
                  max="22:00"
                  id="closingTime"
                  value={data.closingTime}
                  onChange={handleChange}
                  placeholder="Store Closing Time"
                  required="required"
                />
              </div>

              <div className="checkbox" style={{ marginBottom: "11px" }}>
                <h6 style={{ color: "blue" }}>+ Add time slots</h6>
                <h2> Mark open days</h2>
                <h5>Don't forget to uncheck your off-day</h5>
                <br />
                <br />
                <input type="checkbox" id="monday" required="required" />
                <h3>Monday</h3>
                <br />
                <input type="checkbox" id="tuesday" />
                <h3>Tuesday</h3>
                <br />
                <input type="checkbox" id="wednesday" />
                <h3>Wednesday</h3>
                <br />
                <input type="checkbox" id="thursday" />
                <h3>Thursday</h3>
                <br />
              </div>
              <div className="checkbox add_space">
                <input type="checkbox" id="friday" required="required" />
                <h3>Friday</h3>
                <br />
                <input type="checkbox" id="saturday" />
                <h3>Saturday</h3>
                <br />
                <input type="checkbox" id="sunday" />
                <h3>Sunday</h3>
                <br />
              </div>
              <div className="input-fields">
                <label for="">Upload Store Image</label>
                <input
                  type="file"
                  id="storeImage"
                  onChange={handleChange}
                  placeholder="Upload Store Image"
                  required
                />
                <button
                  type="button"
                  className="btn-success"
                  style={{ backgroundColor: imageColor }}
                  onClick={async () => {
                    const formData = new FormData();
                    // Update the formData object
                    formData.append("image", data.storeImage);
                    const config = {
                      headers: {
                        contentType: "multipart/form-data",
                      },
                    };
                    const imagedata1 = await axios.post(
                      `/api/upload/`,
                      formData,
                      config
                    );
                    setImageColor("#93f037");
                    setData({
                      ...data,
                      storeImage: imagedata1.data.imagedata,
                    });
                  }}
                >
                  Upload
                </button>
              </div>

              <div className="input-fields">
                <label for="categories">
                  Add which category would you deliver
                </label>
                <select
                  name="categories"
                  id="categories"
                  value={data.categories}
                  onChange={handleChange}
                  className="options"
                  style={{
                    height: "5rem",
                    borderRadius: "10px",
                    fontSize: "2rem",
                    padding: "0.5rem",
                  }}
                >
                  <option value="categories"> Select </option>
                  <option value="Foods Beverages">Foods Beverages</option>
                  <option value="Pharma Medicine">Pharma Medicine</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Fruits & Vegetable">Fruits & Vegetable</option>
                  <option value="Meat & Fish">Meat & Fish </option>
                  <option value="Pet Supplies">Pet Supplies</option>
                </select>
              </div>

              <div className="input-fields">
                <label for="services">Services</label>
                <select
                  name="services"
                  id="services"
                  value={data.services}
                  onChange={handleChange}
                  className="options"
                  style={{
                    height: "5rem",
                    borderRadius: "10px",
                    fontSize: "2rem",
                    padding: "0.5rem",
                  }}
                >
                  <option value="volvo"> Select </option>
                  <option value="Delivery + Takeaway">
                    Delivery + Takeaway
                  </option>
                  <option value="Only Delivery">Only Delivery</option>
                  <option value="Only Takeaway">Only Takeaway</option>
                  <option value="All Services">All Services</option>
                </select>
              </div>
            </div>
            <div style={{ height: "38rem", marginTop: "1.5rem" }}>
              <LoadScript googleMapsApiKey="AIzaSyB3ZdwasSmzdj5giIxqCmxrJBJVwh5VwqA">
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={mapdata.lat ? mapdata : defaultCenter}
                >
                  {mapdata.lat ? (
                    <Marker
                      position={mapdata}
                      onDragEnd={(e) => onMarkerDragEnd(e)}
                      draggable={true}
                    />
                  ) : null}
                </GoogleMap>
              </LoadScript>
              <button
                className="nextbtn"
                onClick={detectLocation}
                style={{ backgroundColor: detectColor }}
              >
                Auto Detect
              </button>
            </div>

            <div className="fields">
              <div className="input-fields">
                <label for="">Store Address</label>
                <input
                  type="text"
                  id="streetNumber"
                  value={data.streetNumber}
                  onChange={handleChange}
                  placeholder="Enter Street Number"
                  required
                />
              </div>
              <div className="input-fields">
                <label for="">Store Address (Locality)</label>
                <input
                  type="text"
                  id="streetName"
                  value={data.streetName}
                  onChange={handleChange}
                  placeholder="Enter Locality Name"
                  required
                />
              </div>

              <div className="input-fields">
                <label for="">Store Address (City)</label>
                <input
                  type="text"
                  id="city"
                  value={data.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                  required
                />
              </div>

              <div className="input-fields">
                <label for="">Store Address (State)</label>
                <input
                  type="text"
                  id="stateCode"
                  value={data.stateCode}
                  onChange={handleChange}
                  placeholder="Enter State"
                  required
                />
              </div>

              <div className="input-fields">
                <label for="">Store Address (PIN Code)</label>
                <input
                  type="number"
                  id="zipcode"
                  maxLength={6}
                  minLength={6}
                  value={data.zipcode}
                  onChange={handleChange}
                  placeholder="Enter ZIP Code"
                  required
                />
                {data.zipcode.length == "6" ? null : "Enter a 6-digit pin code"}
              </div>
              <div className="input-fields">
                <label for="">Store Address (Country Code)</label>
                <input
                  type="text"
                  id="countryCode"
                  value={data.countryCode}
                  onChange={handleChange}
                  placeholder="Enter Country Code"
                  required
                />
              </div>
            </div>

            <div className="buttons">
              <button
                className="backbtn"
                onClick={getBack}
                style={{ backgroundColor: "grey" }}
              >
                <span className="btnText">Back</span>
                <i className="uil uil-navigator"></i>
              </button>

              <button
                className="nextbtn"
                onClick={handleSubmit2}
                style={{ backgroundColor: btnColor }}
                // disabled={data.zipcode.length == "6"}
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

export default Register1;
