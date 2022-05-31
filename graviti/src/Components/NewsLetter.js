import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewsLetter() {
  const history = useNavigate();
  const [letter, setLetter] = useState({
    name: "",
    email: "",
  });
  const helper = (e) => {
    setLetter({ ...letter, [e.target.id]: e.target.value });
  };
  const handleLetter = async (e) => {
    e.preventDefault();
    console.log(help);
    let { data } = await axios.post(`/api/stores/signNewsletter`, letter);
  };
  const redirect = async (e) => {
    e.preventDefault();
    history("/");
  };
  return (
    <div
      className="modal fade"
      id="newsletterModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title"
              id="exampleModalLongTitle"
              style={{ fontWeight: "500", fontSize: "2rem" }}
            >
              Get regular updates with our Newsletter
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={redirect}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleLetter}>
              <div className="form-group">
                <label for="">
                  <p style={{ fontSize: "large" }}>Name</p>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={letter.name}
                  onChange={helper}
                  required="required"
                />
              </div>
              <div className="form-group">
                <label for="">
                  <p style={{ fontSize: "large" }}>Email Address</p>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={letter.email}
                  onChange={helper}
                  required="required"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Sign Up NewsLetter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
