import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";

// Import your components
import ClientsAndVehicles from "./components/VoitureList"; 
import ClientManagement from "./components/ClientManagement"; 

const App = () => {
  return (
    <Router>
      <Navigation />  {/* Navigation component to handle the links */}
      <Routes>
        <Route path="/" element={<ClientsAndVehicles />} />
        <Route path="/client-management" element={<ClientManagement />} />
      </Routes>
    </Router>
  );
};

// Navigation Component
const Navigation = () => {
  const location = useLocation();  // Now using useLocation inside the Router context

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link 
            to="/" 
            className={`text-white text-lg font-medium transition-all duration-300 
              ${location.pathname === "/" ? "text-blue-200 font-semibold" : "hover:text-blue-200"}`}
          >
            Clients and Vehicles
          </Link>
        </li>
        <li>
          <Link 
            to="/client-management" 
            className={`text-white text-lg font-medium transition-all duration-300 
              ${location.pathname === "/client-management" ? "text-blue-200 font-semibold" : "hover:text-blue-200"}`}
          >
            Client Management
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default App;
