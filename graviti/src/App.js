import React from "react";
import "./deliveryreg.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./Components/Order";
import Product from "./Components/Product";
import Support from "./Components/Support";
import Review from "./Components/Review";
import Insight from "./Components/Insight";
import Wallet from "./Components/Wallet";
import Settings from "./Components/Settings";
import TermsConditions from "./Components/TermsConditions";
import Home from "./Components/Home";
import ProductModal from "./Components/ProductModal";
import Map from "./Components/Map.js";
import Register from "./Components/Register.js";
import Register1 from "./Components/Register1.js";
import Register2 from "./Components/Register2.js";
import Register3 from "./Components/Register3.js";
import Register4 from "./Components/Register4.js";
import Register5 from "./Components/Register5.js";
import Login from "./Components/Login.js";
import Commission from "./Components/Commission";
import FooterTerms from "./Components/FooterTerms";
import NewsLetter from "./Components/NewsLetter.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/register1" element={<Register1 />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/register2" element={<Register2 />}></Route>
        <Route path="/register3" element={<Register3 />}></Route>
        <Route path="/register4" element={<Register4 />}></Route>
        <Route path="/register5" element={<Register5 />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/support" element={<Support />}></Route>
        <Route path="/reviews" element={<Review />}></Route>
        <Route path="/wallet" element={<Wallet />}></Route>
        <Route path="/insight" element={<Insight />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/terms" element={<TermsConditions />}></Route>
        <Route path="/productModal" element={<ProductModal />}></Route>
        <Route path="/commission" element={<Commission />}></Route>
        <Route path="/myterms" element={<FooterTerms />}></Route>
        <Route path="/newsletter" element={<NewsLetter />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
