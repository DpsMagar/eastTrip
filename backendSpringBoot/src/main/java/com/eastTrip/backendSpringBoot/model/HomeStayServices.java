package com.eastTrip.backendSpringBoot.model;


import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.yaml.snakeyaml.events.Event;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class HomeStayServices {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String services;

    @ManyToMany
    private List<HomeStay> homeStays= new ArrayList<>();
}
