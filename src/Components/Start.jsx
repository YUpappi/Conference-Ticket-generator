// import Button from "./Button";
import { useState } from "react";
import Number from "./Number";
import TicketType from "./TicketType";
import PropTypes from "prop-types";
import { useNavigate, NavLink } from "react-router-dom";

function Start({
  select,
  setSelect,
  ticketType,
  setTicketType,
  setCurrentStep,
  currentStep,
}) {
  const navigate = useNavigate();
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  function handleNext() {
    if (!select || !ticketType) return;
    setIsNextDisabled(true);
    navigate("/Ticket");
    console.log("current step: ", currentStep);
    setCurrentStep((prev) => {
      const newStep = prev < 3 ? prev + 1 : 3;
      console.log("Updated step:", newStep);
      return newStep;
    });
    const ticketData = {
      select,
      ticketType,
      currentStep,
    };
    localStorage.setItem("ticketData", JSON.stringify(ticketData));
  }
  return (
    <main className="container">
      <div className="start-main">
        <div className="start-header">
          <h1>Techember Fest 25</h1>
          <p>
            Join us for an unforgettable experience at [Event Name]! Secure your
            spot now.
          </p>
        </div>
        <div className="location">
          <span> 📍[Event Location]</span>
          <span className="liner">|| </span>
          <span>📅March 15, 2025 |7:00PM</span>
        </div>
      </div>

      <div className="border"></div>
      <TicketType ticketType={ticketType} setTicketType={setTicketType} />
      <Number select={select} setSelect={setSelect} />
      <div className="selection-btn">
        <NavLink to="/" className="btn-cancel btn home-btn">
          Cancel
        </NavLink>
        <button
          className="btn-next btn home-btn"
          onClick={handleNext}
          type="button"
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </main>
  );
}

Start.propTypes = {
  select: PropTypes.number.isRequired,
  setSelect: PropTypes.func.isRequired,
  ticketType: PropTypes.string.isRequired,
  setTicketType: PropTypes.func.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default Start;
