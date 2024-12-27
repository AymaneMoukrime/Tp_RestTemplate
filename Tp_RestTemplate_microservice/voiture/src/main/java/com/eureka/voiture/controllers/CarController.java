package com.eureka.voiture.controllers;

import com.eureka.voiture.entities.Car;
import com.eureka.voiture.models.CarResponse;
import com.eureka.voiture.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/car")
public class CarController {
    @Autowired
    private CarService carService;
    @GetMapping
    public List<CarResponse> findAll(){
        return carService.findAll();
    }
    @GetMapping("/{id}")
    public CarResponse findById(@PathVariable Long id) throws Exception{
        return  carService.findById(id);
    }
    @PostMapping("/{id}")
    public CarResponse save(@PathVariable Long id ,@RequestBody Car car){
        return carService.save(id,car);
    }
    @PutMapping("/{id}")
    public CarResponse update(@PathVariable Long id ,@RequestBody Car car){
        return carService.update(id,car);
    }
    // Search endpoint for cars
    @GetMapping("/search")
    public List<CarResponse> searchCars(@RequestParam(required = false) String matricule,
                                        @RequestParam(required = false) String marque,
                                        @RequestParam(required = false) String model) {
        return carService.searchCars(matricule, marque, model);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        carService.delete(id);
    }
}
