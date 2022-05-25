import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function Map() {
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
    vendorType: registerinfo.vendorType,
    categories: registerinfo.categories,
    services: registerinfo.services,
    openingTime: registerinfo.openingTime,
    closingTime: registerinfo.closingTime,
    storeManager: registerinfo.storeManager,
    latitude: "",
    longitude: "",
    countryCode: "",
    stateCode: "",
    zipcode: "",
    streetName: "",
    streetNumber: "",
    city: "",
  });
  const history = useNavigate();
  const [mapdata, setMapdata] = useState({ lat: 41.3851, lng: 5.1734 });
  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
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
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });

  const onMarkerDragEnd = (e) => {
    setMapdata({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    console.log(e.latLng.lat(), e.latLng.lng());
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    setData({ ...data, latitude: mapdata.lat, longitude: mapdata.lng });
    setTimeout(() => {
      history("/register2");
    }, 2000);
  };
  const getBack = async (e) => {
    history("/register1");
  };

  useEffect(() => {
    localStorage.setItem("registerinfo", JSON.stringify(data));
    // history("/register2");
  }, [data]);

  return (
    <div className="container1">
      <header>Registration</header>
      <form>
        <section className="step-wizard">
          <ul className="step-wizard-list">
            <li className="step-wizard-item current-item">
              <span className="progress-count">1</span>
              <span className="progress-label">Pesonal Details</span>
            </li>
            <li className="step-wizard-item">
              <span className="progress-count">2</span>
              {/* <span className="progress-count">2</span-progress-count> */}
              <span className="progress-label">Store Details</span>
            </li>
            <li className="step-wizard-item current-item">
              <span className="progress-count">3</span>
              {/* <span className="progress-count">2</span-progress-count> */}
              <span className="progress-label">Store Details</span>
            </li>
            <li className="step-wizard-item current-item">
              <span className="progress-count">4</span>
              {/* <span className="progress-count">4</span-progress-count> */}
              <span className="progress-label">Bank Details</span>
            </li>
            <li className="step-wizard-item current-item">
              <span className="progress-count">5</span>
              <span className="progress-label">Terms of Use</span>
            </li>
          </ul>
        </section>
        <div className="form second">
          <div className="details personal">
            <span className="title">Store Details</span>
            <div className="fields">
              
            </div>
          </div>
        </div>
      </form>
      <div style={{ height: "15rem", marginTop: "1.5rem" }}>
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
      </div>
      <button className="backbtn" onClick={getBack}>
        <span className="btnText">Back</span>
        <i className="uil uil-navigator"></i>
      </button>

      <button className="nextbtn" onClick={handleSubmit2}>
        <span className="btnText">Next</span>
        <i className="uil uil-navigator"></i>
      </button>
    </div>
  );
}

export default Map;
