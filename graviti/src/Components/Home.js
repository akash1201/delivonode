import { React } from "react";
import { Link } from "react-router-dom";
import image from "./assets/img/delivery-boy.png";
import image1 from "./assets/img/image1.png";
import image2 from "./assets/img/image2.png";
import image3 from "./assets/img/image3.png";
import image4 from "./assets/img/image4.png";
import image6 from "./assets/img/image6.png";
import image7 from "./assets/img/image7.png";
import ravity from "./assets/img/ravity.png";
import logo from "./gblogo.png";

function Home() {
  return (
    <div>
      <nav
        className="Home navbar-expand-lg navbar-light bg-light"
        style={{
          width: "100%",
          height: "8rem",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <img src={logo} style={{ width: "10%", height: "100%" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            // padding: "1rem",
            width: "60%",
            height: "100%",
            backgroundColor: "28A745",
          }}
        >
          <Link
            to="/login"
            style={{
              width: "40%",
            }}
          >
            <button
              type="button"
              className="login_btn"
              style={{
                width: "100%",
                fontSize: "2rem",
                
                borderRadius: "20px",
                marginTop: "1.5rem",
              }}
            >
              Login
            </button>
          </Link>
          <Link
            to="/register"
            style={{
              width: "40%",
            }}
          >
            <button
              type="button"
              className="login_btn"
              // className="navbar-btn btn btn-sm btn-primary d-none d-lg-inline-block ml-3"
              style={{
                width: "100%",
                borderRadius: "20px",
                
                marginTop: "1.5rem",
                fontSize: "2rem",
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
                It's time to take your{" "}
                <strong className="text-primary">business online</strong>
              </h1>

              <p className="lead text-center text-md-left text-muted">
                Register in our app, and get started in no time.
              </p>

              <div className="text-center text-md-left mt-5">
                <a
                  href="#"
                  className="btn btn-primary btn-icon"
                  target="_blank"
                >
                  <span className="btn-inner--text">Download the app</span>
                  <span className="btn-inner--icon">
                    <i data-feather="chevron-right"></i>
                  </span>
                </a>
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
              {/* className="display-4 text-center text-md-left mb-3" */}
              <h3>
                This website stores cookies on your computer. These cookies are
                used to improve your website experience and provide more
                personalized services to you, both on this website and through
                other media. To find out more about the cookies we use, see our
                Privacy Policy.
              </h3>
              <p className="lead text-center text-md-left text-muted">
                Register in our app, and get started in no time.
              </p>

              <div className="text-center text-md-left mt-5">
                <a
                  href="#"
                  className="btn btn-primary btn-icon"
                  target="_blank"
                >
                  <span className="btn-inner--text">Download the app</span>
                  <span className="btn-inner--icon">
                    <i data-feather="chevron-right"></i>
                  </span>
                </a>
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
                  src={image1}
                  className="img-fluid mw-md-120"
                />
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
              {/* className="display-4 text-center text-md-left mb-3" */}
              <h3>
                This website stores cookies on your computer. These cookies are
                used to improve your website experience and provide more
                personalized services to you, both on this website and through
                other media. To find out more about the cookies we use, see our
                Privacy Policy.
              </h3>
              <p className="lead text-center text-md-left text-muted">
                Register in our app, and get started in no time.
              </p>

              <div className="text-center text-md-left mt-5">
                <a
                  href="#"
                  className="btn btn-primary btn-icon"
                  target="_blank"
                >
                  <span className="btn-inner--text">Download the app</span>
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
        <div
          className="row container d-flex justify-content-around"
          style={{ padding: "1rem" }}
        >
          <div
            className="card"
            style={{ width: "24rem", marginBottom: "1rem" }}
          >
            <img src={image2} className="card-img-top" alt="..." />
            <div className="card-body">
              <h4 className="card-title">Food & Beverages</h4>
              <p className="card-description">short description</p>
            </div>
          </div>
          <div
            className="card"
            style={{ width: "24rem", marginBottom: "1rem" }}
          >
            <img src={image2} className="card-img-top" alt="..." />
            <div className="card-body">
              <h4 className="card-title">Food & Beverages</h4>
              <p className="card-description">short description</p>
            </div>
          </div>
          <div
            className="card"
            style={{ width: "24rem", marginBottom: "1rem" }}
          >
            <img src={image2} className="card-img-top" alt="..." />
            <div className="card-body">
              <h4 className="card-title">Food & Beverages</h4>
              <p className="card-description">short description</p>
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
                  src={image1}
                  className="img-fluid mw-md-120"
                />
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
              {/* className="display-4 text-center text-md-left mb-3" */}
              <h3>
                This website stores cookies on your computer. These cookies are
                used to improve your website experience and provide more
                personalized services to you, both on this website and through
                other media. To find out more about the cookies we use, see our
                Privacy Policy.
              </h3>
              <p className="lead text-center text-md-left text-muted">
                Register in our app, and get started in no time.
              </p>

              <div className="text-center text-md-left mt-5">
                <a
                  href="#"
                  className="btn btn-primary btn-icon"
                  target="_blank"
                >
                  <span className="btn-inner--text">Download the app</span>
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
            style={{ width: "28rem", marginBottom: "1rem" }}
          >
            <div className="card-body">
              <h4 className="card-title">Food & Beverages</h4>
              <p className="card-description">short description</p>
            </div>
            <img src={image2} className="card-img-top" alt="..." />
          </div>
          <div
            className="card"
            style={{ width: "28rem", marginBottom: "1rem" }}
          >
            <div className="card-body">
              <h4 className="card-title">Food & Beverages</h4>
              <p className="card-description">short description</p>
            </div>
            <img src={image2} className="card-img-top" alt="..." />
          </div>
          <div
            className="card"
            style={{ width: "28rem", marginBottom: "1rem" }}
          >
            <div className="card-body">
              <h4 className="card-title">Food & Beverages</h4>
              <p className="card-description">short description</p>
            </div>
            <img src={image2} className="card-img-top" alt="..." />
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
                  src={image1}
                  className="img-fluid mw-md-120"
                />
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
              {/* className="display-4 text-center text-md-left mb-3" */}
              <h3>
                This website stores cookies on your computer. These cookies are
                used to improve your website experience and provide more
                personalized services to you, both on this website and through
                other media. To find out more about the cookies we use, see our
                Privacy Policy.
              </h3>
              <p className="lead text-center text-md-left text-muted">
                Register in our app, and get started in no time.
              </p>

              <div className="text-center text-md-left mt-5">
                <a
                  href="#"
                  className="btn btn-primary btn-icon"
                  target="_blank"
                >
                  <span className="btn-inner--text">Download the app</span>
                  <span className="btn-inner--icon">
                    <i data-feather="chevron-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative" id="footer-main">
        <div
          className="footer pt-lg-7 footer-primary"
          style={{ backgroundColor: "#B0E066" }}
        >
          <div className="container pt-3">
            <div className="row">
              <div className="col-lg-6 mb-6 mb-lg-0">
                <span>
                  <h3 style={{ color: "white" }}>
                    <span style={{ color: "#ffffff" }}>Gravity</span>Bites
                  </h3>
                </span>
              </div>

              <div className="col-lg-3 col-6 col-sm-4 mb-5 mb-lg-0">
                <h6 className="heading mb-3" style={{ color: "#ffffff" }}>
                  <b>COMPANY</b>
                </h6>
                <ul className="list-unstyled">
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
                    <a href="#" style={{ color: "black" }}>
                      Term and Condition
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Newslatter
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-6 col-sm-4 ml-lg-auto mb-5 mb-lg-0">
                <h6 className="heading mb-3" style={{ color: "#ffffff" }}>
                  <b>Social Media</b>
                </h6>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{ color: "black" }}>
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="divider divider-fade divider-dark my-4" />
            <div className="row align-items-center justify-content-md-between pb-4">
              <div className="col-md-6">
                <div className="copyright text-sm font-weight-bold text-center text-md-left">
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
