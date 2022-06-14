import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "./SideNav";
import list from "./list.png";
import axios from "axios";
import logout from "./img/poweroff.png";

function AddCategory() {
  const [isActive, setActive] = useState(false);
  const [subcategories, setSubcategories] = useState([]);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useNavigate();

  useEffect(() => {
    async function fetchInfo() {
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/admin/fetchSubcategory`, config);
      console.log(data);
      setSubcategories(data.category);
    }
    fetchInfo();
  }, []);

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
    subcategory: "",
    parent: "",
    bgColor: "red",
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
          <img src={logout} style={{ width: "3rem", height: "2.8rem" }} />
        </div>
      </div>
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
                      }}
                    >
                      Add New Category
                    </span>
                    <div className="fields" style={{ marginBottom: "1rem" }}>
                      <div
                        className="input-fields"
                        style={{ margin: "0 auto" }}
                      >
                        <label for="" style={{ fontSize: "1.2rem" }}>
                          Category Image
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
                        <label for="parent" style={{ fontSize: "1.2rem" }}>
                          Select parent Id
                        </label>
                        <select
                          name="parent"
                          id="parent"
                          value={item.parent}
                          onChange={adding}
                        >
                          <option value="parent">Select </option>;
                          <option value="null">null </option>;
                          {subcategories.map((ele, index) => {
                            return (
                              <option key={index + 1} value={ele.subcategory}>
                                {" "}
                                {ele.subcategory}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="fields" style={{ marginBottom: "1rem" }}>
                      <div
                        className="input-fields"
                        style={{ margin: "0 auto" }}
                      >
                        <label for="" style={{ fontSize: "1.2rem" }}>
                          Sub-Category Name
                        </label>
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

export default AddCategory;
