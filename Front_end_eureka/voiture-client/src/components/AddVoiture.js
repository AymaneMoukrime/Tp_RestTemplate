import React, { useState } from "react";
import { saveVoiture } from "../api/voitureService";

const AddVoiture = () => {
  const [clientId, setClientId] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [matricule, setMatricule] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveVoiture(clientId, { brand, model, matricule });
      alert("Voiture added successfully!");
      // Clear the form after successful submission
      setClientId("");
      setBrand("");
      setModel("");
      setMatricule("");
    } catch (error) {
      console.error("Error adding voiture:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Voiture</h2>
      <input
        type="text"
        placeholder="Client ID"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Matricule"
        value={matricule}
        onChange={(e) => setMatricule(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddVoiture;
