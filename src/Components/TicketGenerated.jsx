import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import NavPage from "./NavPage";
import PropTypes from "prop-types";
import Progress from "./Progress";
import Barcode from "./Barcode";
function TicketGenerated({ select, ticketType }) {
  const [ticketData, setTicketData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("ticketData");
    if (!storedData) {
      navigate("/"); // Redirect to form page if no data found
      return;
    }
    setTicketData(JSON.parse(storedData));
  }, [navigate]);

  if (!ticketData) return <p>uploading ticket...</p>;

  return (
    <div className="homepage">
      <NavPage />

      <div className="main">
        <Progress />
        <div className="ticket-gen">
          <h2>Your Ticket is Booked!</h2>
          <p>You can download or Check your email for a copy</p>

          <div className="ticket-bg">
            <div className="ticket-content">
              <div className="ticket__content-container">
                <div className="ticket-subcontent">
                  <h1>Techember Fest 25</h1>
                  <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                  <p>March 15, 2025 | 7:00 PM</p>
                  <div className="image">
                    <img src={ticketData.imageUrl} alt="user Image" />
                  </div>
                </div>

                <div className="ticket-details">
                  <div className="ticket-sub-details">
                    <div className="user-details">
                      <div className="user-sub-details bottom right">
                        <p>Enter your name</p>
                        <h2>{ticketData.fullName}</h2>
                      </div>

                      <div className="user-sub-details bottom">
                        <p>Enter your email</p>
                        <h2>{ticketData.email}</h2>
                      </div>

                      <div className="user-sub-details bottom right">
                        <p>Ticket type</p>
                        <h2>{ticketType}</h2>
                      </div>

                      <div className="user-sub-details bottom">
                        <p>Ticket for</p>
                        <h2> {select}</h2>
                      </div>
                    </div>
                    <p className="special">Special request?</p>
                    <p>{ticketData.textArea}</p>
                  </div>
                </div>
              </div>
              <Barcode />
            </div>
          </div>
        </div>
        <div className="ticket-btn">
          <NavLink className="btn-cancel btn" to="/">
            Back to Form
          </NavLink>

          <button className="btn-next btn">Download Ticket</button>
        </div>
      </div>

      {/* You can add more ticket details here */}
      {/* <NavLink to="/"></NavLink> */}
    </div>
  );
}

TicketGenerated.propTypes = {
  select: PropTypes.string.isRequired,
  ticketType: PropTypes.string.isRequired,
};

export default TicketGenerated;
