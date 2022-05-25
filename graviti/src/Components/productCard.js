import React from "react";

function ProductCard() {
  return (
    <div className="product_card">
      <img
        src="carrot.jpg"
        alt="Avatar"
        style={{ borderRadius: "18px 18px 0px 0px" }}
      />
      <div className="h4">
        <h4>
          <b>Fresh Carrots</b>
        </h4>
      </div>

      <div className="product_price">
        <h4>
          <b>Price</b>
        </h4>
        <h4>
          <b>$4.50/kg</b>
        </h4>
      </div>
      <div className="product_edit">
        <button>EDIT</button>
      </div>
    </div>
  );
}

export default ProductCard;
