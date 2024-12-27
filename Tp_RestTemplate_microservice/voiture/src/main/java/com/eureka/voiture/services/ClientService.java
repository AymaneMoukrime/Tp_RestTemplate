package com.eureka.voiture.services;

import com.eureka.voiture.entities.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String BASE_URL = "http://localhost:8888/SERVICE-CLIENT/api/client";

    public Client getClientById(Long id) {
        return restTemplate.getForObject(BASE_URL + "/" + id, Client.class);
    }

    public List<Client> getAllClients() {
        return restTemplate.getForObject(BASE_URL, List.class);
    }

}
