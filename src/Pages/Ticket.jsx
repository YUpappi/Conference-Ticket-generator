import { useState } from "react";
import NavPage from "../Components/NavPage";
import Progress from "../Components/Progress";
import ImageUploader from "../Components/ImageUploader";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Ticket({ select, ticketType }) {
  const [errors, setErrors] = useState({});
  //   const [isSubmitted, setisSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    imageUrl: "",
    textArea: "",
  });

  const navigate = useNavigate();

  function formValidate() {
    const newErrors = {};

    //validation for empty name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.textArea.trim()) {
      newErrors.textArea = "Message isrequired";
    }

    //validation for empty or wrong email input
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    //validation for empty or wrong image url upload
    if (!formData.imageUrl) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  //handle submission button

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValidate()) {
      return;
    }

    const ticketData = {
      ...formData,
      select,
      ticketType,
    };
    localStorage.setItem("ticketData", JSON.stringify(ticketData));
    navigate("/Ticketgenerated");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear errors for every input change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  return (
    <div className="homepage">
      <NavPage />
      <main className="main">
        <Progress />

        <form onSubmit={handleSubmit}>
          <>
            <div className="container">
              <div className="tickets">
                <p>Upload Profile Photo</p>
                <div className="tickets-container">
                  <ImageUploader
                    onImageUpload={(url) => {
                      setFormData((prev) => ({
                        ...prev,
                        imageUrl: url,
                      }));
                    }}
                  />
                </div>
                {/*  */}
              </div>
            </div>
            <div className="ticket-border"></div>
            <div className="label-container">
              {/* full name field */}
              <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{
                    borderColor: errors.fullName ? "#ef4444" : "",
                  }}
                />
                {errors.fullName && (
                  <div className="fullName-error">{errors.fullName}</div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    borderColor: errors.email ? "#ef4444" : "",
                  }}
                />
                {errors.email && (
                  <div className="email-error">{errors.email}</div>
                )}
              </div>

              {/* Text Area Field */}
              <div>
                <label htmlFor="textArea">Special request?</label>
                <div>
                  <textarea
                    id="textArea"
                    name="textArea"
                    value={formData.textArea}
                    onChange={handleChange}
                    rows="5"
                    cols="30"
                    style={{
                      borderColor: errors.email ? "#ef4444" : "",
                    }}
                  />
                </div>
                {errors.textArea && (
                  <div className="text-error">{errors.textArea}</div>
                )}
              </div>
            </div>

            <div className="ticket-btn">
              <NavLink className="btn-cancel btn" to="/">
                Back
              </NavLink>

              <button className="btn-next btn" type="submit">
                Get Free Ticket
              </button>
            </div>
          </>
        </form>
      </main>
    </div>
  );
}

Ticket.propTypes = {
  select: PropTypes.number.isRequired,
  ticketType: PropTypes.string.isRequired,
};

export default Ticket;
