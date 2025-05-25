package com.eastTrip.backendSpringBoot.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserPoints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Integer points;

    @PrePersist
    public void prePersist() {
        if (points == null) {
            points= 1000;
        }
    }
}
