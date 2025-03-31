package com.eastTrip.backendSpringBoot.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hotel_Rooms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private boolean room_feature;

    @ManyToMany(mappedBy = "RoomFeatures")
    private Set<Hotel> hotels=new HashSet<>();

}
