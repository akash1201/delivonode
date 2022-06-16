import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "./SideNav";
import Header from "./Header.js";
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
    category: "",
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
      <Header toggleClass={toggleClass} />
      <div className="bottomHeader">
        <div className="lefty">
          <SideNav isActive={isActive} />
        </div>
        <div className="righty  page-content page-container" id="page-content">
          <div className="row container d-flex justify-content-center">
            <div className="container1">
              <form
                onSubmit={handleSubmit}
                style={{
                  boxShadow:
                    " rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px",
                }}
              >
                <div className="form first">
                  <div className="details personal">
                    <span
                      className="title"
                      style={{
                        fontWeight: "900",
                        width: "50%",
                        margin: "0 auto",
                        fontSize: "2rem",
                        marginBottom: "2rem",
                      }}
                    >
                      Add New Coupon
                    </span>
                    <div className="fields" style={{ marginBottom: "1rem" }}>
                      <div
                        className="input-fields"
                        style={{ margin: "0 auto" }}
                      >
                        <label for="" style={{ fontSize: "1.2rem" }}>
                          Coupon Image
                        </label>
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
                    <div className="fields" style={{ marginBottom: "1rem" }}>
                      <div
                        className="input-fields"
                        style={{ margin: "0 auto" }}
                      >
                        <label for="" style={{ fontSize: "1.2rem" }}>
                          Coupon Category
                        </label>
                        <input
                          type="text"
                          id="category"
                          value={item.category}
                          onChange={adding}
                          placeholder="Enter Coupon Category"
                          required
                        />
                      </div>
                    </div>
                    <button
                      className="nextbtn btn-success"
                      type="submit"
                      style={{
                        marginLeft: "15.5rem",
                        fontSize: "1.2rem",
                        padding: "0.5rem",
                        borderRadius: "15px",
                      }}
                    >
                      Submit
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
