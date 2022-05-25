import { React, useState, useEffect } from "react";
import TopNav from "./TopNav";
import SideNav from "./sideNav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Review() {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [dataReview, setDataReview] = useState([]);
  useEffect(async () => {
    if (!userInfo) {
      history("/");
    }
    if (userInfo) {
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/fetchReviews`, config);
      console.log(2, data);
      setDataReview(data.reviews);
    }
  }, []);
  return (
    <div>
      <TopNav />
      <div className="main">
        <SideNav />
        <div className="dashboard">
          <div className="review-container">
            <div className="review_cards">
              {dataReview.map((ele) => {
                return (
                  <div className="review_card">
                    <div className="review_card-top">
                      <div className="name">
                        <div className="img one" alt="">
                          GB
                          {/* add a avatar for this image */}
                        </div>
                        <p>Full {ele.userId.name}</p>
                      </div>
                      <div className="rate">
                        <span>{ele.rating}</span>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>

                    <div className="review_card-content">
                      <p>
                        {ele.comment}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quidem consequuntur, impedit ullam provident deserunt
                        repellendus fuga totam exercitationem minima molestias?
                      </p>
                    </div>

                    <div className="review_card-action">
                      <span>13 Feb, 2021</span>
                      {/* add date of time stam here */}
                      <button className="btn">
                        <i className="fas fa-external-link-alt"></i>
                        Share
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
