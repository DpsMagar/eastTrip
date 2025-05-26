package com.eastTrip.backendSpringBoot.dto;

import lombok.Data;

@Data
public class HotelReviewRequestDTO {
    public Long hId;
    public Long userId;
    public int rating;
    public String comment;
    public String timeSpan;
    public String name;
}
