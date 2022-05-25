import {
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  REMOVE_ERROR,
} from "../types";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_ADD_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_ADD_SUCCESS:
      return { loading: false, products: [...state.products, action.payload] };
    case PRODUCT_ADD_FAIL:
      return { ...state, loading: false, error: action.payload };

    case REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
