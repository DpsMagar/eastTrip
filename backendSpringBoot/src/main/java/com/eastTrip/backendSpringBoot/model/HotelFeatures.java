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
public class HotelFeatures {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String hotelFeatures;

    @ManyToMany(mappedBy = "featuresOfHotel")
    private Set<Hotel> hotels= new HashSet<>();

}
