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

export const fetchVoituresByClientId = async (clientId) => {
  const response = await axios.get(`${BASE_URL}/SERVICE-CAR/api/car/client/${clientId}`);
  return response.data;
};
