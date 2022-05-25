import axios from "axios";
import {
  ORDERS_FAIL,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  REMOVE_ERROR,
} from "../types";

export const listorders = () => async (dispatch, getState) => {
  try {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";
    dispatch({ type: ORDERS_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/getallorders`, config);
    dispatch({
      type: ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: ORDERS_FAIL, payload: error.response });
  }
};

export const removeError = () => (dispatch) => {
  dispatch({ type: REMOVE_ERROR });
};
