package com.eastTrip.backendSpringBoot.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String email;

    private String password;

    private String provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private Integer phoneNumber;

    private String address;
    private String country;
    private String city;
    private String gender;
    private LocalDate dateOfBirth;
    private String profileImage;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private UserPoints userPoints;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Bookings> bookings;


}
