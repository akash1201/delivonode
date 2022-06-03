import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Table(ele) {
  const history = useNavigate();
  const redirect = (e) => {
    history(`/vendorInfo/${e}`);
  };
  return <div Table></div>;
}

export default Table;
