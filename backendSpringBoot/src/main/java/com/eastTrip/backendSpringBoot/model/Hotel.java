package com.eastTrip.backendSpringBoot.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String location;
    private String attraction;
    private int price;
    private String rating;
    private int numberOfSeats;

    @Column(columnDefinition="TEXT")
    private String description;

    @ManyToMany
    private Set<HotelRooms> RoomFeatures= new HashSet<>();

    @ManyToMany
    private Set<HotelFeatures> featuresOfHotel= new HashSet<>();
}
