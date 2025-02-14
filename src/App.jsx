import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Ticket from "./Pages/Ticket";
import TicketGenerated from "./Components/TicketGenerated";

function App() {
  const [select, setSelect] = useState(1);
  const [ticketType, setTicketType] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  // function handleItems(Item) {
  //   setSelect(Item);
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              select={select}
              setSelect={setSelect}
              ticketType={ticketType}
              setTicketType={setTicketType}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          }
        />
        <Route
          path="/Ticket"
          element={
            <Ticket
            // select={select}
            // setSelect={setSelect}
            // ticketType={ticketType}
            />
          }
        />
        <Route
          path="/Ticketgenerated"
          element={<TicketGenerated select={select} ticketType={ticketType} />}
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
