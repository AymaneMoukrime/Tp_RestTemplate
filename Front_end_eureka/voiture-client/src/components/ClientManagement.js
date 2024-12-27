import React, { useState, useEffect } from "react";
import { fetchClients, saveClient, updateClient, deleteClient, searchClients } from "../api/clientService"; // Assuming clientService has search method
import { Link } from "react-router-dom";

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ nom: "", age: "" });
  const [editClient, setEditClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch all clients or search clients based on query
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = searchQuery
          ? await searchClients(searchQuery) // Use search method if searchQuery is not empty
          : await fetchClients(); // Otherwise, fetch all clients
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchData();
  }, [searchQuery]); // Re-fetch clients whenever searchQuery changes

  // Add a new client
  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await saveClient(newClient);
      alert("Client added successfully!");
      setNewClient({ nom: "", age: "" });
      const updatedClients = await fetchClients();
      setClients(updatedClients);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  // Edit client
  const handleEditClient = (client) => {
    setEditClient(client);
  };

  // Update client
  const handleUpdateClient = async (e) => {
    e.preventDefault();
    try {
      await updateClient(editClient.id, editClient);
      alert("Client updated successfully!");
      setEditClient(null);
      const updatedClients = await fetchClients();
      setClients(updatedClients);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  // Delete client
  const handleDeleteClient = async (id) => {
    try {
      await deleteClient(id);
      alert("Client deleted successfully!");
      const updatedClients = await fetchClients();
      setClients(updatedClients);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Client Management</h1>

      {/* Search Clients */}
      <div className="section mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Search Clients</h2>
        <input
          type="text"
          placeholder="Search by Name or Age"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Add New Client Form */}
      <div className="section mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Add New Client</h2>
        <form onSubmit={handleAddClient} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={newClient.nom}
              onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Age</label>
            <input
              type="number"
              placeholder="Age"
              value={newClient.age}
              onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Add Client
          </button>
        </form>
      </div>

      {/* Edit Existing Client */}
      {editClient && (
        <div className="section mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">Edit Client</h2>
          <form onSubmit={handleUpdateClient} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={editClient.nom}
                onChange={(e) => setEditClient({ ...editClient, nom: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                placeholder="Age"
                value={editClient.age}
                onChange={(e) => setEditClient({ ...editClient, age: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-300"
            >
              Update Client
            </button>
          </form>
        </div>
      )}

      {/* Clients List */}
      <div className="section">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Client List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800">{client.nom}</h3>
              <p className="text-gray-600">Age: {client.age}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleEditClient(client)}
                  className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;
