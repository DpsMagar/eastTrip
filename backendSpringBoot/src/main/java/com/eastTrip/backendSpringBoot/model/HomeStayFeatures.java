package com.eastTrip.backendSpringBoot.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class HomeStayFeatures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String services;

    @ManyToMany
    private List<HomeStay> homeStays= new ArrayList<>();
}
