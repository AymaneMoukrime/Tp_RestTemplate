package com.eureka.client.services;

import com.eureka.client.entities.Client;
import com.eureka.client.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    // Fetch all clients
    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    // Find a client by ID, return null if not found
    public Client findById(Long id) {
        Optional<Client> client = clientRepository.findById(id);
        return client.orElse(null); // Return null if client not found
    }

    // Add a new client
    public Client addClient(Client client){
        return clientRepository.save(client);
    }

    // Update an existing client
    public void updateClient(Long id, Client updatedClient) throws Exception {
        Client existingClient = findById(id);
        if (existingClient == null) {
            throw new Exception("Client not found with ID: " + id);
        }
        existingClient.setNom(updatedClient.getNom());
        existingClient.setAge(updatedClient.getAge());
        clientRepository.save(existingClient);
    }

    // Delete a client
    public void deleteClient(Long id) throws Exception {
        if (!clientRepository.existsById(id)) {
            throw new Exception("Client not found with ID: " + id);
        }
        clientRepository.deleteById(id);
    }

    public List<Client> searchClients(String query) {
        return clientRepository.findByNomContainingIgnoreCase(query);
    }

}
