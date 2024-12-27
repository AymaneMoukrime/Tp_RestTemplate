import axios from "axios";
import { BASE_URL } from "./config";

export const fetchVoitures = async () => {
  const response = await axios.get(`${BASE_URL}/SERVICE-CAR/api/car`);
  return response.data;
};

export const fetchVoitureById = async (id) => {
  const response = await axios.get(`${BASE_URL}/SERVICE-CAR/api/car/${id}`);
  return response.data;
};

export const saveVoiture = async (clientId, voiture) => {
  const response = await axios.post(`${BASE_URL}/SERVICE-CAR/api/car/${clientId}`, voiture);
  return response.data;
};

export const updateVoiture = async (id, voiture) => {
  const response = await axios.put(`${BASE_URL}/SERVICE-CAR/api/car/${id}`, voiture);
  return response.data;
};

export const searchVoitures = async (searchQuery) => {
  try {
    // Construct the search parameters
    const params = {
      matricule: searchQuery.matricule,
      brand: searchQuery.brand,
      model: searchQuery.model,
    };
    
    // Make a GET request with query parameters
    const response = await axios.get(`${BASE_URL}/SERVICE-CAR/api/car/search`, { params });
    return response.data;  // Return the filtered list of cars
  } catch (error) {
    console.error("Error searching vehicles:", error);
    return [];
  }
  
};
export const deleteVoiture = async (id) => {
  await axios.delete(`${BASE_URL}/SERVICE-CAR/api/car/${id}`);
};
