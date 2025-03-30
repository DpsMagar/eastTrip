package com.eastTrip.backendSpringBoot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.DayOfWeek;

@Entity
@Data

public class AirportOpeningDay {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "airport_id", nullable = false)
    private Airport airport;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DayOfWeek dayOfWeek;
}
