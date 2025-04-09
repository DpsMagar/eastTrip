package com.eastTrip.backendSpringBoot.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class HomeStay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String location;
    private String attraction;
    private int price;
    private String rating;

    @Column(columnDefinition = "TEXT")
    private String extraInfo;

    @ManyToMany
    private List<HomeStayRooms> roomFeatures= new ArrayList<>();

    @ManyToMany
    private List<HomeStayFeatures> services = new ArrayList<>();

    private String imageUrl;

}
