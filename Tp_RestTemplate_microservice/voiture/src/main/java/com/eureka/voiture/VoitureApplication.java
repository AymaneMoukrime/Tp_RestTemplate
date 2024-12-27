package com.eureka.voiture;

import com.eureka.voiture.entities.Car;
import com.eureka.voiture.repositories.CarRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class VoitureApplication {

    public static void main(String[] args) {
        SpringApplication.run(VoitureApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(5000);
        requestFactory.setReadTimeout(5000);
        restTemplate.setRequestFactory(requestFactory);
        return restTemplate;
    }
    @Bean
    public CommandLineRunner commandLineRunner(CarRepository carRepository) {
        return args -> {
            carRepository.save(new Car(null,"Tayota","2022","M2515",1L));
            carRepository.save(new Car(null,"dacia","2022","M103",2L));
            carRepository.save(new Car(null,"Tayota","2022","M8515",3L));
        };
    }

}
