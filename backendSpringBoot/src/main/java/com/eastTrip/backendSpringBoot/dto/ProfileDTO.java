package com.eastTrip.backendSpringBoot.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProfileDTO {
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String country;
    private String gender;
    private LocalDate dateOfBirth;
    private int rewardPoints;
    private String profileImage;
}
