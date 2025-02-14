import PropTypes from "prop-types";
function Progress({ currentStep = 1, maxSteps = 3 }) {
  const stepProgress = ["Ticket Selection", "Attendance Details", "Ready"];

  const step = Math.min(currentStep, maxSteps);
  const stepText = stepProgress[step - 1] || stepProgress[0];
  return (
    <div>
      <header className="progress">
        <p>{stepText}</p>
        <p>
          Steps <strong>{step}</strong>/ <strong>{maxSteps}</strong>
        </p>
        <progress max={maxSteps} value={step}></progress>
      </header>
    </div>
  );
}

Progress.propTypes = {
  currentStep: PropTypes.number,
  maxSteps: PropTypes.number,
};

export default Progress;
