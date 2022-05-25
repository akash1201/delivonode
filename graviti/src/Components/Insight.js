import { React, useState, useEffect } from "react";
import TopNav from "./TopNav";
import SideNav from "./sideNav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import image from "./graph.png";

function Insight() {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [insight, setInsight] = useState("");
  const [top, setTop] = useState([]);
  useEffect(async () => {
    if (!userInfo) {
      history("/login");
    }
    if (userInfo) {
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/betweendates`, config);
      const newdata = await axios.get(`/api/orders/topselling`, config);
      console.log(newdata, "45");
      console.log(data);
      setInsight(data);
      setTop(newdata.data.details);
    }
  }, []);
  return (
    <div>
      <TopNav />
      <div className="main">
        <SideNav />
        <div className="dashboard">
          <div className="entire">
            <div className="today_info">
              <div className="all_insights" style={{ margin: "1rem" }}>
                <div className="text-container">
                  <div className="thing">
                    Orders
                    <br />
                    <span>{insight.orderNo}</span>
                  </div>

                  <div className="thing">
                    Items Sold
                    <br />
                    <span>{insight.itemsold}</span>
                  </div>

                  <div className="thing">
                    Earnings
                    <br />
                    <span>{insight.earning}</span>
                  </div>
                </div>
              </div>
              <div className="graph" id="top_x_div" style={{ margin: "1rem" }}>
                <img
                  src={image}
                  style={{ width: "100%", padding: "0.8rem", height: "100%" }}
                />
              </div>
            </div>

            <div className="top_selling" style={{ margin: "1rem" }}>
              <div className="product-container">
                <h3 className="title">Top Selling Products</h3>
                {top.map((ele) => {
                  return (
                    <div className="card mb-3" style={{ maxWidth: "540px" }}>
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img
                            src={ele._id.image}
                            className="card-img"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{ele._id.name}</h5>

                            <p className="card-text">
                              <small className="text-muted">
                                {ele.totalSold} Items Sold{" "}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insight;
