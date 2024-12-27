package com.eureka.client.controllers;

import com.eureka.client.entities.Client;
import com.eureka.client.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/client")
public class ClientController {
    @Autowired
    private ClientService service;

    @GetMapping
    public List<Client> finAll(){
        return  service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        Client client = service.findById(id);
        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if client is not found
        }
        return ResponseEntity.ok(client);
    }

    @PostMapping
    public void save(@RequestBody Client client){
        service.addClient(client);
    }
    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody Client updatedClient) throws Exception {
        service.updateClient(id, updatedClient);
    }

    // Delete a client
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) throws Exception {
        service.deleteClient(id);
    }

    @GetMapping("/search")
    public List<Client> searchClients(@RequestParam String query) {
        return service.searchClients(query);
    }
}
