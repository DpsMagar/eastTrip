package com.eastTrip.backendSpringBoot.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InnBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String name;


    private int numberOfRooms;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private int numberOfGuests;
    private int totalPrice;

    private boolean isConfirmed = false;
    private LocalDate bookedAt = LocalDate.now();

    private int innType;
    private int innId;
    private boolean hasPaid= false;
}
