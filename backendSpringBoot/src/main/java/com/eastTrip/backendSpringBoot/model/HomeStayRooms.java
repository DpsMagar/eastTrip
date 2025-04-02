package com.eastTrip.backendSpringBoot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data

public class HomeStayRooms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String roomFeature;

    @ManyToMany(mappedBy = "roomFeatures")
    private List<HomeStay> homeStays= new ArrayList<>();


}
