package com.eureka.client;

import com.eureka.client.entities.Client;
import com.eureka.client.repositories.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class ClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClientApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ClientRepository clientRepository) {
        return args -> {
            clientRepository.save(new Client(null,"Ahmed",30.5f));
            clientRepository.save(new Client(null,"Houssam",500.5f));
            clientRepository.save(new Client(null,"Aymane",3000.5f));
        };
    }

}
