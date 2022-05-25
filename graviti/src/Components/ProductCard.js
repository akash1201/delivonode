import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function ProductCard({ ele }) {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const deleteProduct = async (id) => {
    if (!userInfo) {
      history("/login");
    }
    if (userInfo) {
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `/api/products/delete-product/${id}`,
        config
      );
    }
  };

  return (
    <div className="product_card">
      <img src={ele.image} alt="Avatar" />
      <div className="h4">
        <h4>
          <b>Fresh {ele.name}</b>
        </h4>
      </div>

      <div className="product_price">
        <h6>
          <b>
            {ele.price} Rs. for {ele.qty} {ele.unit}
          </b>
        </h6>

        <button
          type="button"
          class="btn btn-xs btn-toggle"
          data-toggle="button"
          aria-pressed="false"
          autocomplete="off"
          onClick={deleteProduct(ele._id)}
        >
          <i class="fa fa-trash"></i>
        </button>
      </div>

      <br></br>
      <div className="product_edit">
        <button>EDIT</button>
        {/* <button onClick={deleteProduct(ele._id)}>Delete</button> */}
      </div>
    </div>
  );
}

export default ProductCard;
