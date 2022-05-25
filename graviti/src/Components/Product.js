import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listproducts, addProduct } from "../actions/productActions";
import ProductCard from "./ProductCard.js";
import TopNav from "./TopNav";
import SideNav from "./sideNav";
import "./img/carrot.jpg";
import axios from "axios";

function Product() {
  const productData = useSelector((state) => state.productData);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { products } = productData;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [subcategory, setSubcategory] = useState([]);
  useEffect(async () => {
    if (!userInfo) {
      history("/");
    }
    if (userInfo) {
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/products/getSubcategories`,
        config
      );
      setSubcategory(data.subCategory);
      dispatch(listproducts(`Green-Vegetables`));
    }
  }, []);
  // const deleteProduct = async (id) => {
  //   if (!userInfo) {
  //     history("/login");
  //   }
  //   if (userInfo) {
  //     const config = {
  //       headers: {
  //         authorization: `Bearer ${userInfo.token}`,
  //       },
  //     };
  //     const { data } = await axios.delete(
  //       `/api/products/delete-product/${id}`,
  //       config
  //     );
  //   }
  // };
  return (
    <div>
      <TopNav />
      <div className="main">
        <SideNav />
        <div className="dashboard">
          <div className="product_nav" style={{ backgroundColor: "white" }}>
            <ul className="product_ul">
              {subcategory.map((ele) => {
                return (
                  <li>
                    <a href="" style={{ color: "black" }}>
                      {ele}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="product_cards">
            {products.map((ele) => {
              return <ProductCard ele={ele} key={ele._id} />;
            })}
            <button
              style={{
                width: "30%",
                height: "10%",
                borderRadius: "50px",
                color: "white",
                backgroundColor: "green",
                marginTop: "18%",
              }}
            >
              <Link
                className="active"
                to="/productModal"
                style={{ color: "white", backgroundColor: "green" }}
              >
                Add New Product
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
