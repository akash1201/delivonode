import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNav from "./Components/SideNav.js";
import DeliveryProfile from "./Components/DeliveryProfile.js";
import VendorDetails from "./Components/VendorDetails.js";
import Users from "./Components/Users.js";
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import Documents from "./Components/Documents";
import Categories from "./Components/Categories";
import Coupons from "./Components/Coupons";
import AddCategory from "./Components/AddCategory";
import AddCoupon from "./Components/AddCoupon";
import Complaints from "./Components/Complaints";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/VendorDetails" element={<VendorDetails />}></Route>
        <Route path="/vendorInfo/:Id" element={<Documents />}></Route>
        <Route path="/DeliveryProfile" element={<DeliveryProfile />}></Route>
        <Route path="/Users" element={<Users />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/coupons" element={<Coupons />}></Route>
        <Route path="/addcategory" element={<AddCategory />}></Route>
        <Route path="/addcoupon" element={<AddCoupon />}></Route>
        <Route path="/complaints" element={<Complaints />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
