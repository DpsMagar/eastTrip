package com.eastTrip.backendSpringBoot.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    private String attraction;
    private int price;
    private String rating;
//    private int numberOfSeats;


    @Column(columnDefinition="TEXT")
    private String extraInfo;

    @ManyToMany
    private List<HotelRooms> roomFeatures= new ArrayList<>();

    @ManyToMany
    private List<HotelFeatures> featuresOfHotel= new ArrayList<>();

    private String imageUrl;
}
