import React from "react";

function AllOrdercard() {
  return (
    <div className="order-card" style={{ border: "1px solid black" }}>
      <div
        className="icon"
        style={{ border: "2px solid green", width: "60px", height: "60px" }}
      ></div>
      <div className="order-data" style={{ width: "100%" }}>
        <div className="order-row1">
          <div className="receipient-name">Samantha Saint</div>
          <div className="order-cost">$ 20.45</div>
        </div>
        <div className="order-row2">
          <div className="timestamp">June 20, 11:30am</div>
          <div className="paymentmode">Cash On Delivery</div>
        </div>
        <div className="order-row3">
          <div className="order-num">Order Num 214412</div>
          <div className="order-items">Items: 4</div>
          <div className="order-status" style={{ color: "rgb(58, 190, 18)" }}>
            Pending
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllOrdercard;
