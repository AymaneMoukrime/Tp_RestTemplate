package com.eureka.voiture.entities;


public class Client {
    private Long id;
    private String nom;
    private Integer age;

    public Client(Long id, String name, Integer age) {
        this.id = id;
        this.nom = name;
        this.age = age;
    }

    public Client() {
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String name) {
        this.nom = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
