package com.eastTrip.backendSpringBoot.dto;

import com.eastTrip.backendSpringBoot.model.DayOfWeek;
import lombok.Data;

@Data
public class FlightSearchRequestDTO {

    private String toCode;
    private String fromCode;
    private String dayOfWeek;
}
