import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "./SideNav";

import axios from "axios";

function AddCategory() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useNavigate();
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
    const { data } = await axios.post(
      `/api/admin/createCategory`,
      item,
      config
    );
  };

  const [item, setItem] = useState({
    image: "",
    name: "",
    subcategory: "",
    categoryId: "",
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
      <div className="lefty">
        <SideNav />
      </div>
      <div className="righty  page-content page-container" id="page-content">
        <div className="row container d-flex justify-content-center">
          <div className="container1">
            <form onSubmit={handleSubmit}>
              <div className="form first">
                <div className="details personal">
                  <span className="title">Add New Category</span>
                  <div className="fields">
                    <div className="input-fields">
                      <label for="">Category Image</label>
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
                      <label for="">Category Id</label>
                      <input
                        type="text"
                        id="categoryId"
                        value={item.categoryId}
                        onChange={adding}
                        placeholder="Enter Category Id"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="fields">
                    <div className="input-fields">
                      <label for="">Category Name</label>
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
                      <label for="">Sub-Category Name</label>
                      <input
                        type="text"
                        id="subcategory"
                        value={item.subcategory}
                        onChange={adding}
                        placeholder="Enter Product Sub-Category"
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
  );
}

export default AddCategory;
