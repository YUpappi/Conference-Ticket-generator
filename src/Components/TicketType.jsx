import PropTypes from "prop-types";
function TicketType({ ticketType, setTicketType }) {
  const types = [
    { value: "free", type: "regular access", available: "20/52" },
    { value: "$150", type: "vip access", available: "20/52" },
    { value: "$150", type: "vvip access", available: "20/52" },
  ];
  const handleClick = (option) => {
    setTicketType(option.type);
    console.log("selected :", option);
  };
  return (
    <div className="ticket-type">
      <p>Select Ticket Type:</p>
      <div className="type-container">
        <div className="type-menu">
          <div className="type__menu-info">
            {types.map((option) => (
              <div
                className={`type__menu-item ${
                  option.type === ticketType ? "selected" : ""
                }`}
                onClick={() => handleClick(option)}
                key={option.type}
              >
                <span className="value">{option.value}</span>
                <span className="type">{option.type}</span>
                <p className="avail">{option.available} left!</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

TicketType.propTypes = {
  ticketType: PropTypes.string.isRequired,
  setTicketType: PropTypes.func.isRequired,
};

export default TicketType;
