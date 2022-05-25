import {
  ORDERS_FAIL,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  REMOVE_ERROR,
} from "../types";

export const orderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_REQUEST:
      return { loading: true, orders: [] };
    case ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        date: action.payload.date,
        time: action.payload.time,
      };
    case ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
