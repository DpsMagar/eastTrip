package com.eastTrip.backendSpringBoot.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserPoints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private int points;

}
