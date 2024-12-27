package com.eureka.voiture.services;

import com.eureka.voiture.entities.Car;
import com.eureka.voiture.entities.Client;
import com.eureka.voiture.models.CarResponse;
import com.eureka.voiture.repositories.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private ClientService clientService;

    public List<CarResponse> findAll() {
        return carRepository.findAll().stream()
                .map(this::convertToCarResponse)
                .collect(Collectors.toList());
    }

    public CarResponse findById(Long id) throws Exception {
        Car car = carRepository.findById(id).orElseThrow(() -> new Exception("Car not found"));
        return convertToCarResponse(car);
    }

    public CarResponse save(Long clientid,Car car) {
        Client client=clientService.getClientById(clientid);
        car.setClient_id(client.getId());
        Car savedCar = carRepository.save(car);
        return convertToCarResponse(savedCar);
    }

    public CarResponse update(Long id, Car car) {
        Optional<Car> existingCar = carRepository.findById(id);
        if (existingCar.isPresent()) {
            Car updatedCar = existingCar.get();
            updatedCar.setBrand(car.getBrand());
            updatedCar.setModel(car.getModel());
            updatedCar.setMatricule(car.getMatricule());
            if(car.getClient_id()!=null) {
                
            updatedCar.setClient_id(car.getClient_id());}
            System.out.println(car.getClient_id());
            return convertToCarResponse(carRepository.save(updatedCar));
        } else {
            throw new RuntimeException("Car not found with id " + id);
        }
    }

    public void delete(Long id) {
        carRepository.deleteById(id);
    }

    public List<CarResponse> searchCars(String matricule, String marque, String model) {
        List<Car> cars;
        if (matricule != null && marque != null && model != null) {
            cars = carRepository.findByMatriculeAndBrandAndModel(matricule, marque, model);
        } else if (matricule != null) {
            cars = carRepository.findByMatriculeContainingIgnoreCase(matricule);
        } else if (marque != null) {
            cars = carRepository.findByBrandContainingIgnoreCase(marque);
        } else if (model != null) {
            cars = carRepository.findByModelContainingIgnoreCase(model);
        } else {
            cars = carRepository.findAll();
        }
        return cars.stream()
                .map(this::convertToCarResponse)  // Convert each car entity to CarResponse
                .collect(Collectors.toList());
    }
    private CarResponse convertToCarResponse(Car car) {
        Client client = clientService.getClientById(car.getClient_id());
        CarResponse carResponse = new CarResponse();
        carResponse.setBrand(car.getBrand());
        carResponse.setModel(car.getModel());
        carResponse.setMatricule(car.getMatricule());
        carResponse.setId(car.getId());
        carResponse.setClient(client);
        return carResponse;
    }
}
