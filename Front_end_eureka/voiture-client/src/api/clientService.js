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
