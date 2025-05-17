package com.eastTrip.backendSpringBoot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelSearchResultsDTO {
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
    private Integer propertyType;
    private boolean isListed;
//    private List<HotelReviewRequest> reviews;

}
