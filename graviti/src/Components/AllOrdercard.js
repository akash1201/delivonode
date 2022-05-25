import React from "react";
import vegetable from "./vegetables.png";

function AllOrdercard({ ele, index }) {
  return (
    <div className="order-card" style={{ border: "1px solid black" }}>
      <img className="icon" style={{ padding: "0.5rem" }} src={vegetable}></img>

      <div className="order-data" style={{ width: "100%" }}>
        <div className="order-row1">
          <div className="receipient-name">
            {ele.userId.name} {ele.userId.lastName}
          </div>
          <div className="order-cost">
            <b>$ {ele.Total}</b>
          </div>
        </div>
        <div className="order-row2">
          <div className="timestamp">June 20, 11:30am</div>
          <div className="paymentmode">Cash On Delivery</div>
        </div>
        <div className="order-row3">
          <div className="order-num">Order No. {index}</div>
          <div className="order-items">Items: {ele.products.length}</div>
          <div className="order-status" style={{ color: "rgb(58, 190, 18)" }}>
            {ele.status}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllOrdercard;
