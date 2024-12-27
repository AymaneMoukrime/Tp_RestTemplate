import React, { useState, useEffect } from "react";
import { fetchClients } from "../api/clientService";
import { fetchVoitures, saveVoiture, updateVoiture } from "../api/voitureService";
import { FaUser, FaCar } from "react-icons/fa";
import "./ClientsAndVehicles.css"; // Import the CSS file

const ClientsAndVehicles = () => {
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [vehicleForm, setVehicleForm] = useState({ matricule: "", marque: "", model: "" });
  const [editVehicleId, setEditVehicleId] = useState(null);

  // Fetch clients and vehicles on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await fetchClients();
        setClients(clientsData);

        const vehiclesData = await fetchVoitures();
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
  
    const newVehicle = {
      matricule: vehicleForm.matricule,
      brand: vehicleForm.brand,
      model: vehicleForm.model,
      client_id: selectedClient, // Include client_id in the request body
    };
  
    try {
      if (editVehicleId) {
        await updateVoiture(editVehicleId, newVehicle); // Update vehicle
        alert("Vehicle updated successfully!");
      } else {
        await saveVoiture(selectedClient, newVehicle); // Add new vehicle
        alert("Vehicle added successfully!");
      }
  
      setVehicleForm({ matricule: "", brand: "", model: "" });
      setSelectedClient("");
      setEditVehicleId(null);
  
      const updatedVehicles = await fetchVoitures();
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error("Error adding/updating vehicle:", error);
    }
  };
  
  const handleEditVehicle = (vehicle) => {
    setEditVehicleId(vehicle.id);
    setVehicleForm({
      matricule: vehicle.matricule,
      brand: vehicle.brand,
      model: vehicle.model,
    });
    setSelectedClient(vehicle.client.id);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Clients and Vehicles</h1>

      <div className="section mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaUser className="text-blue-500 mr-2" />
                <span className="text-xl font-bold">{client.nom}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600">Age:</span>
                <span className="ml-2 text-gray-800">{client.age}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Add or Edit Vehicle</h2>
        <form onSubmit={handleVehicleSubmit} className="vehicle-form bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Select Client</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Matricule</label>
            <input
              type="text"
              placeholder="Matricule"
              value={vehicleForm.matricule}
              onChange={(e) => setVehicleForm({ ...vehicleForm, matricule: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Marque</label>
            <input
              type="text"
              placeholder="Marque"
              value={vehicleForm.brand}
              onChange={(e) => setVehicleForm({ ...vehicleForm, brand: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Model</label>
            <input
              type="text"
              placeholder="Model"
              value={vehicleForm.model}
              onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {editVehicleId ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </form>
      </div>

      <div className="section">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Vehicles</h2>
        <table className="vehicle-table w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="p-4 border border-gray-300 bg-gray-200">Matricule</th>
              <th className="p-4 border border-gray-300 bg-gray-200">Marque</th>
              <th className="p-4 border border-gray-300 bg-gray-200">Model</th>
              <th className="p-4 border border-gray-300 bg-gray-200">Owner</th>
              <th className="p-4 border border-gray-300 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-100 transition-colors duration-300">
                <td className="p-4 border border-gray-300">{vehicle.matricule}</td>
                <td className="p-4 border border-gray-300">{vehicle.brand}</td>
                <td className="p-4 border border-gray-300">{vehicle.model}</td>
                <td className="p-4 border border-gray-300">{vehicle.client.nom}</td>
                <td className="p-4 border border-gray-300">
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-300"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsAndVehicles;
