package com.eastTrip.backendSpringBoot.dto;

import lombok.Data;

@Data
public class HotelReviewRequest {
    public Long hotelId;
    public Long userId;
    public int rating;
    public String comment;
    public String timeSpan;
}
