import axios from "axios";
import { BASE_URL } from "./config";

export const fetchClients = async () => {
  const response = await axios.get(`${BASE_URL}/SERVICE-CLIENT/api/client`);
  return response.data;
};

export const fetchClientById = async (id) => {
  const response = await axios.get(`${BASE_URL}/SERVICE-CLIENT/api/client/${id}`);
  return response.data;
};

export const saveClient = async (client) => {
  return axios.post(`${BASE_URL}/SERVICE-CLIENT/api/client`, client);
};

export const updateClient = async (id, client) => {
  await axios.put(`${BASE_URL}/SERVICE-CLIENT/api/client/${id}`, client);
};

export const deleteClient = async (id) => {
  await axios.delete(`${BASE_URL}/SERVICE-CLIENT/api/client/${id}`);
};

export const searchClients = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/SERVICE-CLIENT/api/client/search`, {
      params: { query },
    });
    console.log("Search response:", response.data);  // Log response to inspect the data
    return response.data;
  } catch (error) {
    console.error("Error searching clients:", error);
    throw error;
  }
};

