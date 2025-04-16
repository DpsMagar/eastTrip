//package com.eastTrip.backendSpringBoot.model;
//
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Entity
//@Data
//public class Bookings {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "flight_id", nullable = false)
//    private FlightDetails flight;
//
//    private LocalDate travelDate;
//    private boolean roundTrip= false;
//
//    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Traveler> travelers;
//
//
//}

//{
//        "name": "HomeStay Butwal",
//        "location": "Butwal",
//        "attraction": "Near Mall Road",
//        "price": 3500,
//        "rating": 4,
//        "extraInfo": "Free Wi-Fi, Complimentary Breakfast",
//        "imageUrl": "https://example.com/images/sapphire.jpg",
//        "featureIds": [1, 2, 3],
//        "roomFeatureIds": [4, 5]
//        }

