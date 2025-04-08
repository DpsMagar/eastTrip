package com.eastTrip.backendSpringBoot.dto;

import com.eastTrip.backendSpringBoot.model.DayOfWeek;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class FlightSearchResultsDTO {
    private String toName;
    private String fromName;
    private String toCode;
    private String fromCode;
    private String toCity;
    private String fromCity;
    private String flightDuration;
    private int availableSeats;
    private BigDecimal price;
    private String imageUrl;


}