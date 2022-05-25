import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { orderReducer } from "./reducers/orderReducer";
import { productReducer } from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  userRegister: {
    userInfo: userInfoFromStorage,
  },
};
const reducer = combineReducers({
  userLogin: userLoginReducer,
  productData: productReducer,
  orderData: orderReducer,
  userRegister: userRegisterReducer,
});
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
