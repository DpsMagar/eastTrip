package com.eastTrip.backendSpringBoot.dto;

import lombok.Data;

@Data
public class HomestayReviewRequest {
    public Long homestayId;
    public Long userId;
    public int rating;
    public String comment;
}
