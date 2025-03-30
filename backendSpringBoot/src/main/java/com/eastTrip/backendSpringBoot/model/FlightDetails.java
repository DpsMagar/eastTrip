package com.eastTrip.backendSpringBoot.model;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class FlightDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int flightId;

    private String fromAirport;

    private String toAirport;

    private LocalDate departureDate;
    private LocalDate returnDate;

    private boolean roundTrip;

    private String travelClass;
    private String fareType;

    private BigDecimal price;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bookings> bookings;



}
