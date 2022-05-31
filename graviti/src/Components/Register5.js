import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register5() {
  const history = useNavigate();
  const nowContinue = () => {
    setTimeout(() => {
      history("/login");
    }, 2000);
  };
  return (
    <div className="container1" style={{ width: "70%", height: "100%" }}>
      <div className=" container p-3 text-center">
        <h1 className="mb-3">Revised Payment Charge</h1>
        <h6>
          If you do not wish to get an online PG, but still wish to update to
          get a higher monthly Umit and more payment instrument, then please go
          back to the formand remove website and app.{" "}
        </h6>
      </div>
      <div className="container" style={{ height: "75%" }}>
        <table className="table table-bordered" style={{ fontSize: "2.2rem" }}>
          <thead>
            <tr>
              <th scope="col">PAYMENT</th>
              <th scope="col">REVISED MDR</th>
              <th scope="col">MONTHLY ACCEPTANCE LIMIT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Food & Beverages</td>
              <td>20%</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Vegetables & Grocery</td>
              <td>10%</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Meat & Fish</td>
              <td>20%</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Medicine</td>
              <td>13%</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Pet supplies</td>
              <td>13%</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Payment Mechanism Fee</td>
              <td>1.90%</td>
              <td>Taxes on Order Value</td>
            </tr>
          </tbody>
        </table>
        <div className=" container p-3 text-center">
          <h6>
            If you do not wish to get an online PG, but still wish to update to
            get a higher monthly Umit and more payment instrument If you do not
            wish to get ..
          </h6>
        </div>
      </div>
      <button
        type="button"
        className="btn-success"
        data-toggle="modal"
        data-target="#exampleModal"
        style={{ fontSize: "2rem" }}
      >
        <span className="btnText">Continue</span>
        <i className="uil uil-navigator"></i>
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Thank Your Registering on Gravity Bites. Our Team will verify your
              documents, after which your account would be activated.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={nowContinue}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register5;
