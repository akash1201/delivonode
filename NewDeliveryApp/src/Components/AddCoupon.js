import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "./SideNav";
import list from "./list.png";
import axios from "axios";

function AddCoupon() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useNavigate();
  const dispatch = useDispatch();
  const fileUpload = async (e) => {
    e.preventDefault();

    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("image", item.image);
    const config = {
      headers: {
        contentType: "multipart/form-data",
      },
    };
    const { data } = await axios.post(`/api/upload/`, formData, config);
    setItem({ ...item, image: data.imagedata });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/admin/createCoupons`, item, config);
  };

  const [item, setItem] = useState({
    image: "",
    name: "",
    description: "",
  });

  const adding = (event) => {
    if (event.target.id == "image") {
      setItem({ ...item, [event.target.id]: event.target.files[0] });
    } else {
      setItem({ ...item, [event.target.id]: event.target.value });
    }
  };
  return (
    <div className="main">
      <div className="topHeader">
        <div className="top_title">
          <img
            src={list}
            style={{
              width: "2rem",
              height: "2rem",
              marginRight: "2rem",
              marginTop: "0.5rem",
            }}
            onClick={toggleClass}
          ></img>
          <h2>Gravity Bites</h2>
        </div>
        <div className="topLogout">
          <h2>Logout</h2>
        </div>
      </div>
      <div className="bottomHeader">
        <div className="lefty">
          <SideNav isActive={isActive} />
        </div>
        <div className="righty  page-content page-container" id="page-content">
          <div className="row container d-flex justify-content-center">
            <div className="container1">
              <form onSubmit={handleSubmit}>
                <div className="form first">
                  <div className="details personal">
                    <span className="title">Add New Coupon</span>
                    <div className="fields">
                      <div className="input-fields">
                        <label for="">Coupon Image</label>
                        <input
                          type="file"
                          name="image,"
                          placeholder="Add Category Image"
                          id="image"
                          onChange={adding}
                          required="required"
                        />
                        <button onClick={fileUpload}>Upload</button>
                      </div>
                    </div>
                    <div className="fields">
                      <div className="input-fields">
                        <label for="">Coupon Name</label>
                        <input
                          type="text"
                          id="name"
                          value={item.name}
                          onChange={adding}
                          placeholder="Enter Item Name"
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="fields">
                      <div className="input-fields">
                        <label for="">Coupon Description</label>
                        <input
                          type="text"
                          id="subcategory"
                          value={item.description}
                          onChange={adding}
                          placeholder="Enter Coupon Description"
                          required
                        />
                      </div>
                    </div>
                    <button className="nextbtn" type="submit">
                      <span className="btnText">Submit</span>
                      <i className="uil uil-navigator"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCoupon;
