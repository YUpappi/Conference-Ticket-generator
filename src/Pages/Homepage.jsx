import NavPage from "../Components/NavPage";
import Progress from "../Components/Progress";
import Start from "../Components/Start";
import PropTypes from "prop-types";

function Homepage({
  select,
  setSelect,
  ticketType,
  setTicketType,
  currentStep,
  setCurrentStep,
}) {
  return (
    <div className="homepage">
      <NavPage />
      <main className="main">
        <Progress currentStep={currentStep} maxSteps={3} />
        <Start
          select={select}
          setSelect={setSelect}
          ticketType={ticketType}
          setTicketType={setTicketType}
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
        />
      </main>
    </div>
  );
}

Homepage.propTypes = {
  select: PropTypes.number.isRequired,
  setSelect: PropTypes.func.isRequired,
  ticketType: PropTypes.string.isRequired,
  setTicketType: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};

export default Homepage;
