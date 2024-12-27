package com.eureka.client.repositories;

import com.eureka.client.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    public List<Client> findByNomContainingIgnoreCase(String nom);

}
