import { React } from "react";
import { Link } from "react-router-dom";
import image from "./assets/img/delivery-boy.png";
import image2 from "./grocery.png";
import image7 from "./customdelivery.png";
import logo from "./gblogo.png";
import medicine from "./medicine.png";
import playstore from "./img/playstore.png";
import facebook from "./img/facebook.png";
import linkedin from "./img/linkedin.png";
import twitter from "./img/twitter.png";
import youtube from "./img/youtube.png";
import instagram from "./img/instagram.png";
import downloadstore from "./img/downloadstore.png";
import appstore from "./img/appstore.png";
import pet from "./pet.png";
import food from "./food.png";
import meat from "./meat.png";
import feature1 from "./feature1.png";
import feature2 from "./feature2.png";
import feature3 from "./feature3.png";
import feature4 from "./feature4.png";

function Home() {
  return (
    <div>
      <nav
        className="Home navbar-expand-lg navbar-light bg"
        style={{
          width: "100%",
          height: "8rem",
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "white",
        }}
      >
        <img src={logo} style={{ width: "15%", height: "100%" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            // padding: "1rem",
            width: "25%",
            height: "100%",
            backgroundColor: "white",
          }}
        >
          <Link
            to="/login"
            // style={{
            //   width: "50%",
            // }}
          >
            <button
              type="button"
              className="login_btn"
              style={{
                width: "100%",
                fontSize: "1.8rem",
                border: "none",

                borderRadius: "15px",
                marginTop: "1.5rem",
              }}
            >
              Login
            </button>
          </Link>
          <Link
            to="/register"
            // style={{
            //   width: "50%",
            // }}
          >
            <button
              type="button"
              className="login_btn"
              // className="navbar-btn btn btn-sm btn-primary d-none d-lg-inline-block ml-3"
              style={{
                width: "100%",
                borderRadius: "15px",
                border: "none",
                backgroundColor: "#93f037",

                marginTop: "1.5rem",
                fontSize: "1.8rem",
              }}
            >
              Register
            </button>
          </Link>
        </div>
      </nav>
      <section className="slice py-2">
        <div className="container">
          <div className="row row-grid align-items-center">
            <div className="col-12 col-md-5 col-lg-6 order-md-2 text-center">
              <div className="w-100">
                {/* <!-- <img alt="Image placeholder" src="assets/img/svg/illustrations/illustration-3.svg" className="img-fluid mw-md-120"> --> */}
                <img
                  alt="Image placeholder"
                  src={image}
                  className="img-fluid mw-md-120"
                />
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
              <h1 className="display-4 text-center text-md-left mb-3">
                Got Delivered{" "}
                <strong className="text-success">Everything You Need</strong>
              </h1>

              <p className="lead text-center text-md-left text-muted">
                Register in our app, and get started in no time.
              </p>

              <div className="text-center text-md-left mt-5">
                {/* <a
                  href="#"
                  className="btn btn-primary btn-icon"
                  target="_blank"
                >
                  <span className="btn-inner--text">Download the app</span>
                  <span className="btn-inner--icon">
                    <i data-feather="chevron-right"></i>
                  </span>
                </a> */}
                <img src={downloadstore} style={{ marginRight: "0.5rem" }} />

                <img src={appstore} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="slice py-2">
        <div className="container">
          <div className="row row-grid align-items-center">
            <div className="col-12 col-md-5 col-lg-6 order-md-2 text-center">
              <div className="w-100">
                {/* <!-- <img alt="Image placeholder" src="assets/img/svg/illustrations/illustration-3.svg" className="img-fluid mw-md-120"> --> */}
                <img
                  alt="Image placeholder"
                  src={image2}
                  className="img-fluid mw-md-120"
                />
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
              <h1 className="display-4 text-center text-md-left mb-3">
                {/* It's time to take your{" "} */}
                <strong className="text-success">Groceries</strong>
              </h1>
              <h3>
                Let go off your hectic grocery shopping. Now order groceries
                with us and save time with our quick delivery services.
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="slice py-2">
        <div className="container">
          <div className="row row-grid align-items-center">
            <div className="col-12 col-md-5 col-lg-6 order-md-2 text-center">
              <div className="w-100">
                {/* <!-- <img alt="Image placeholder" src="assets/img/svg/illustrations/illustration-3.svg" className="img-fluid mw-md-120"> --> */}
                <img
                  alt="Image placeholder"
                  src={medicine}
                  className="img-fluid mw-md-120"
                />
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
              {/* className="display-4 text-center text-md-left mb-3" */}
              <h1 className="display-4 text-center text-md-left mb-3">
                {/* It's time to take your{" "} */}
                <strong className="text-success">Medicines</strong>
              </h1>

              <br />
              <h3>
                When you do not fell well. Order Medicines with quick delivery &
                hassle free experience.
              </h3>
              <h4> (You can upload your prescription)</h4>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div
          className="row container d-flex justify-content-around"
          style={{ padding: "1rem" }}
        >
          <div
            className="card"
            style={{
              width: "27rem",
              marginBottom: "1rem",
            }}
          >
            <img src={food} className="card-img-top" alt="..." />
            <div className="card-body">
              <h1 className="card-title">Food & Beverages</h1>
              <p className="card-description">
                When you are Hungry, Don't Worry order your favourite food with
                us.
              </p>
            </div>
          </div>
          <div
            className="card"
            style={{
              width: "27rem",
              marginBottom: "1rem",
            }}
          >
            <img src={pet} className="card-img-top" alt="..." />
            <div className="card-body">
              <h1 className="card-title">Pet Supplies</h1>
              <p className="card-description">
                {" "}
                Make your Pets Strong & Healthy
              </p>
            </div>
          </div>
          <div
            className="card"
            style={{
              width: "27rem",
              marginBottom: "1rem",
            }}
          >
            <img src={meat} className="card-img-top" alt="..." />
            <div className="card-body">
              <h1 className="card-title">Fish & Meat</h1>
              <p className="card-description">
                Have a Hygienic experience while ordering Meat. We will best
                quality Luscious Fish & Meat.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="slice py-2">
        <div className="container">
          <div className="row row-grid align-items-center">
            <div className="col-12 col-md-5 col-lg-6 order-md-2 text-center">
              <div className="w-100">
                {/* <!-- <img alt="Image placeholder" src="assets/img/svg/illustrations/illustration-3.svg" className="img-fluid mw-md-120"> --> */}
                <img
                  alt="Image placeholder"
                  src={image7}
                  className="img-fluid mw-md-120"
                />
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
              {/* className="display-4 text-center text-md-left mb-3" */}
              <h1 className="display-4 text-center text-md-left mb-3">
                {/* It's time to take your{" "} */}
                <strong className="text-success">Custom Delivery</strong>
              </h1>
              <h3>
                As a part of the GravityBites Services, GravityBites also gives
                you an option to avail the Pick Up and Drop Off Services being
                provided by our Delivery Partners.
              </h3>
              <div className="text-center text-md-left mt-5">
                <a
                  href="#"
                  className="btn btn-success btn-icon"
                  target="_blank"
                >
                  <span className="btn-inner--text">Arrange Pickup</span>
                  <span className="btn-inner--icon">
                    <i data-feather="chevron-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row container d-flex justify-content-center">
          <h3>Delivery Partner you can count on</h3>
        </div>
        <div
          className="row container d-flex justify-content-around"
          style={{ padding: "1rem" }}
        >
          <div
            className="card"
            style={{
              width: "28rem",
              marginBottom: "1rem",
              backgroundColor: "#eee",
            }}
          >
            <div className="card-body">
              <h1 className="card-title">Choose what you want</h1>
              <p className="card-description">
                Select items from you favourite stores at gravitybites.co or in
                the app.
              </p>
            </div>
            <img src={feature2} className="card-img-top" alt="..." />
          </div>
          <div
            className="card"
            style={{
              width: "28rem",
              marginBottom: "1rem",
              backgroundColor: "#eee",
            }}
          >
            <div className="card-body">
              <h1 className="card-title">See real-time updates</h1>
              <p className="card-description">
                Personal shoppers pick items from care. Chat as they shop and
                manage your order.
              </p>
            </div>
            <img src={feature4} className="card-img-top" alt="..." />
          </div>
          <div
            className="card"
            style={{
              width: "28rem",
              marginBottom: "1rem",
              backgroundColor: "#eee",
            }}
          >
            <div className="card-body">
              <h1 className="card-title">Get ypu items same-day</h1>
              <p className="card-description">
                Pick a convenient time for you. Enjoy Gravity Bite's 100%
                quality guarantee on every order.
              </p>
            </div>
            <img src={feature3} className="card-img-top" alt="..." />
          </div>
        </div>
        <div className="row container d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-success btn-lg"
            style={{ fontSize: "2rem" }}
          >
            Start Shopping
          </button>
        </div>
      </div>
      <section className="slice py-2">
        <div className="container">
          <div className="row row-grid align-items-center">
            <div className="col-12 col-md-5 col-lg-6 order-md-2 text-center">
              <div className="w-100">
                {/* <!-- <img alt="Image placeholder" src="assets/img/svg/illustrations/illustration-3.svg" className="img-fluid mw-md-120"> --> */}
                <img
                  alt="Image placeholder"
                  src={feature1}
                  className="img-fluid mw-md-120"
                />
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
              {/* className="display-4 text-center text-md-left mb-3" */}
              <h3>
                Get your product Delivered with minimum commission and get
                instant payments t&c applied.
              </h3>
              <div className="text-center text-md-left mt-5">
                <Link to="/register" clLinkssName="btn btn-success btn-icon">
                  <button className="btn-success btn ">Join Us</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative" id="footer-main">
        <div
          className="footer pt-lg-7 footer-primary"
          style={{
            backgroundColor: "#FFFFFF",
          }}
        >
          <div className="container pt-3">
            <div className="row">
              <div className="col-lg-6 mb-6 mb-lg-0">
                <span>
                  <h1 style={{ color: "#93f037" }}>
                    <span>Gravity</span>Bites
                  </h1>
                </span>
                <span>
                  <a href="https://www.instagram.com/gravitybites/?hl=en">
                    <img
                      src={instagram}
                      style={{
                        width: "2rem",
                        height: "2rem",
                        marginRight: "1rem",
                      }}
                    />
                  </a>
                  <a href="">
                    <img
                      src={youtube}
                      style={{
                        width: "2rem",
                        height: "2rem",
                        marginRight: "1rem",
                      }}
                    />
                  </a>
                  <a href="https://www.facebook.com/Gravitybites/?ref=pages_you_manage">
                    <img
                      src={facebook}
                      style={{
                        width: "2rem",
                        height: "2rem",
                        marginRight: "1rem",
                      }}
                    />
                  </a>
                  <a href="">
                    <img
                      src={twitter}
                      style={{
                        width: "2rem",
                        height: "2rem",
                        marginRight: "1rem",
                      }}
                    />
                  </a>
                  <a href="https://www.linkedin.com/company/gravity-bites-gb/">
                    <img
                      src={linkedin}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </a>
                </span>
                <div>
                  <img src={downloadstore} style={{ marginRight: "0.5rem" }} />

                  <img src={appstore} />
                </div>
              </div>

              <div className="col-lg-3 col-6 col-sm-4 mb-5 mb-lg-0">
                <h3 className="heading mb-3" style={{ color: "#93f037" }}>
                  <b>COMPANY</b>
                </h3>
                <ul
                  className="list-unstyled"
                  style={{ fontSize: "1.8rem", fontWeight: "500" }}
                >
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <Link to="/myterms" style={{ color: "black" }}>
                      Term and Condition
                    </Link>
                  </li>
                  <li>
                    {/* <a href="#" style={{ color: "black" }}>
                      Newsletter
                    </a> */}
                    <Link
                      to="/newsletter"
                      data-toggle="modal"
                      data-target="#newsletterModal"
                    >
                      Newsletter
                    </Link>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Cookies
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Become our Store partner
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-6 col-sm-4 ml-lg-auto mb-5 mb-lg-0">
                <h3 className="heading mb-3" style={{ color: "#93f037" }}>
                  <b>Social Media</b>
                </h3>
                <ul
                  className="list-unstyled"
                  style={{ fontSize: "1.8rem", fontWeight: "500" }}
                >
                  <li>
                    <a
                      href="https://www.facebook.com/Gravitybites/?ref=pages_you_manage"
                      style={{ color: "black" }}
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/gravitybites/?hl=en"
                      style={{ color: "black" }}
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="" style={{ color: "black" }}>
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.aedin.com/company/gravity-bites-gb/"
                      style={{ color: "black" }}
                    >
                      Linkedin
                    </a>
                  </li>
                  <li>
                    <a href="" style={{ color: "black" }}>
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Join our Delivery Team
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="divider divider-fade divider-dark my-4" />
            <div className="row align-items-center justify-content-md-between pb-4">
              <div className="col-md-6">
                <div
                  className="copyright text-sm font-weight-bold text-center text-md-left"
                  style={{ fontWeight: "500", fontSize: "1.5rem" }}
                >
                  &copy; 2022 <a href="#">GravityBites</a>. All rights reserved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
