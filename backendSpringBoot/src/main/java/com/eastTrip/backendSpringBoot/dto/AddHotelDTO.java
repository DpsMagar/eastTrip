package com.eastTrip.backendSpringBoot.dto;

import lombok.Data;

import java.util.List;

@Data
public class AddHotelDTO {

    private String name;
    private String location;
    private String attraction;
    private int price;
    private String rating;
    private String extraInfo;
    private String imageUrl;
    private List<Integer> roomFeatureIds;
    private List<Integer> featureIds;

}
