package com.eastTrip.backendSpringBoot.dto;

import lombok.Data;

@Data
public class HomestayReviewRequestDTO {
    public Long homestayId;
    public Long userId;
    public int rating;
    public String comment;
    public String timeSpan;
    public String name;
}
