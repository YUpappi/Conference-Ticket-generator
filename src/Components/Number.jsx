import PropTypes from "prop-types";

function Number({ select, setSelect }) {
  // Create an array of numbers from 1 to 20
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="number">
      <p>Select Number of Tickets:</p>
      <select onChange={(e) => setSelect(e.target.value)} value={select}>
        {numbers.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
}

Number.propTypes = {
  select: PropTypes.number.isRequired,
  setSelect: PropTypes.func.isRequired,
};

export default Number;
