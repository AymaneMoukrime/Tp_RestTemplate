package com.eureka.voiture.repositories;

import com.eureka.voiture.entities.Car;
import com.eureka.voiture.models.CarResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    // Search by matricule
    List<Car> findByMatriculeContainingIgnoreCase(String matricule);

    // Search by marque
    List<Car> findByBrandContainingIgnoreCase(String marque);

    // Search by model
    List<Car> findByModelContainingIgnoreCase(String model);

    // Search by matricule, marque, and model together
    List<Car> findByMatriculeAndBrandAndModel(String matricule, String marque, String model);
}
