package com.eastTrip.backendSpringBoot.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToMany(mappedBy = "services")
    @JsonIgnore
    private List<HomeStay> homeStays= new ArrayList<>();
}
