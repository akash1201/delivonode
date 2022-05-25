import { React, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function PendingOrdercard({ ele, index }) {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const acceptOrder = async () => {
    console.log("OrderAccepted");
    console.log(userInfo.token);
    if (userInfo) {
      console.log(ele._id);
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/orders/updateOrderStatus/${ele._id}`,
        {},
        config
      );
    }

    // if (data) {
    //   history("/order");
    // }
  };
  // useEffect(
  //   async (e) => {

  //   },
  //   [acceptOrder]
  // );

  const declineOrder = async () => {
    if (userInfo) {
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/orders/declineOrderStatus/${ele._id.toString()}`,
        config
      );
      if (data) {
        history("/order");
      }
    }
  };

  return (
    <div className="pending_card">
      <div className="order-address">{ele.address.streetName}</div>
      <div className="card_info">
        <div className="card_item">
          <div className="ordernum">Order No. {index}</div>
          <div className="orderprice">
            <b>{ele.products.length}</b> item for <b>${ele.Total}</b>
          </div>
          <div className="received">
            Received 6 minutes ago
            {/* add time stamp here */}
          </div>
        </div>
        <div className="img_delivered">
          <div>{ele.status}</div>
        </div>
      </div>
      <div className="accept-button">
        <button type="button" onClick={acceptOrder}>
          Accept Order
        </button>
        <button typee="button" onClick={declineOrder}>
          Decline Order
        </button>
      </div>
    </div>
  );
}

export default PendingOrdercard;
