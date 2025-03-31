package com.eastTrip.backendSpringBoot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelSearchResultsDTO {
    private String hotelName;
    private String hotelLocation;
    private String attraction;
    private int rating;
    private Set<String> roomFeatures;
    private Set<String> hotelFeatures;
    private int price;
    private String extraInfo;

    public HotelSearchResultsDTO(String name, String location, String rating, int price, int numberOfSeats, Object o) {
    }
}
