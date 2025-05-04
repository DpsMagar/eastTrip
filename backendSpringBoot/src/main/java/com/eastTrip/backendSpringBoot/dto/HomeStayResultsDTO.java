package com.eastTrip.backendSpringBoot.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomeStayResultsDTO {

    private int homeStayId;
    private String homeStayName;
    private String homeStayLocation;
    private String attraction;
    private int rating;
    private List<String> roomFeatures;
    private List<String> HomeStayFeatures;
    private int price;
    private String extraInfo;
    private String imageUrl;
}
