import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TopNav from "./TopNav";
import SideNav from "./sideNav";
import { addProduct } from "../actions/productActions";
import axios from "axios";

function ProductModal() {
  const productData = useSelector((state) => state.productData);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { products } = productData;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [productimage, setProductimage] = useState("");
  const fileUpload = async (e) => {
    e.preventDefault();
    if (userInfo) {
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
      setProductimage({ image: data.imagedata });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      addProduct({
        name: item.name,
        image: productimage.image,
        category: item.category,
        subcategory: item.subcategory,
        price: item.price,
        qty: item.qty,
        unit: item.unit,
        inStock: item.inStock,
        discount: item.discount,
      })
    );
    // history("/product");
  };

  const [item, setItem] = useState({
    name: "",
    image: "",
    category: userInfo.categories,
    subcategory: "",
    price: "",
    qty: "",
    unit: "",
    inStock: true,
    discount: "0",
  });

  const adding = (event) => {
    if (event.target.id == "image") {
      setItem({ ...item, [event.target.id]: event.target.files[0] });
    } else {
      setItem({ ...item, [event.target.id]: event.target.value });
    }
  };
  // const redirect = async (e) => {
  //   e.preventDefault();
  //   history("/product");
  // };
  return (
    <div>
      <TopNav />
      <div className="main">
        <SideNav />
        
        <div className="container1">
          <form onSubmit={handleSubmit}>
            <div className="form first">
              <div className="details personal">
                <span className="title">Personal Details</span>
                <div className="fields">
                  <div className="input-fields">
                    <label for="">Item Image</label>
                    <input
                      type="file"
                      name="image,"
                      placeholder=""
                      id="image"
                      onChange={adding}
                      required="required"
                    />
                    <button onClick={fileUpload}>Upload</button>
                  </div>
                  <div className="input-fields">
                    <label for="">Item Name</label>
                    <input
                      type="text"
                      id="name"
                      value={item.name}
                      onChange={adding}
                      placeholder="Enter Item Name"
                      required="required"
                    />
                  </div>

                  <div className="input-fields">
                    <label for="">Sub-Category</label>
                    <input
                      type="text"
                      id="subcategory"
                      value={item.subcategory}
                      onChange={adding}
                      placeholder="Enter Product Sub-Category"
                      required
                    />
                  </div>
                  <div className="input-fields">
                    <label for="">Product Price</label>
                    <input
                      type="Number"
                      id="price"
                      value={item.price}
                      onChange={adding}
                      placeholder="Enter Product Price"
                      required="required"
                    />
                  </div>
                  <div className="input-fields">
                    <label for="">Quantity</label>
                    <input
                      type="text"
                      id="qty"
                      value={item.qty}
                      onChange={adding}
                      placeholder="Quantity"
                      required="required"
                    />
                  </div>
                  <div className="input-fields">
                    <label for="">Unit</label>
                    <input
                      type="text"
                      id="unit"
                      value={item.unit}
                      onChange={adding}
                      placeholder="Unit"
                      required="required"
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
  );
}

export default ProductModal;
