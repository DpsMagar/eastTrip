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

    @ManyToOne
    @JoinColumn(name = "from_airport_id", nullable = false)
    private Airport fromAirport;

    @ManyToOne
    @JoinColumn(name = "to_airport_id", nullable = false)
    private Airport toAirport;

    private LocalDate departureDate;
    private LocalDate returnDate;

    private boolean roundTrip;

    private String travelClass;
    private String fareType;

    private String flightDuration;

    private int availableSeats;

    private BigDecimal price;

//    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Bookings> bookings;



}
