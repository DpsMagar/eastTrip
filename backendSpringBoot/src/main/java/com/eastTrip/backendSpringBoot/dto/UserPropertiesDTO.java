package com.eastTrip.backendSpringBoot.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserPropertiesDTO {

    private Long hotelId;
    private String hotelName;
    private String hotelLocation;
    private String attraction;
    private int rating;
    private List<String> roomFeatures;
    private List<String> hotelFeatures;
    private int price;
    private String extraInfo;
    private String imageUrl;
}
