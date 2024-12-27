import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ClientsAndVehicles from "./components/VoitureList"
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ClientsAndVehicles/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
