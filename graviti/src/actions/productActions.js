import axios from "axios";
import {
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_SUCCESS,
  REMOVE_ERROR,
} from "../types";

export const listproducts = (category) => async (dispatch, getState) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";
    dispatch({ type: PRODUCTS_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/products/vendor/get-products/${category}`,
      config
    );
    dispatch({
      type: PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({ type: PRODUCTS_FAIL, payload: error.response });
  }
};

export const removeError = () => (dispatch) => {
  dispatch({ type: REMOVE_ERROR });
};
export const addProduct = (newProduct) => async (dispatch) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";
    dispatch({ type: PRODUCT_ADD_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/products/add-product`,
      newProduct,
      config
    );
    dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload: error.response.data.msg,
    });
  }
};
