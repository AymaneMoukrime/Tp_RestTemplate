package com.eureka.client.services;

import com.eureka.client.entities.Client;
import com.eureka.client.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> findAll() {
        return clientRepository.findAll();
    }
    public Client findById(Long id) throws Exception{
        return clientRepository.findById(id).orElseThrow(()->new Exception("Invalid Client ID"));
    }
    public Client addClient(Client client){
        return clientRepository.save(client);
    }
}
