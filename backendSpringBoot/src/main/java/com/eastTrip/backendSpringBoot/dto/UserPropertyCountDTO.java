package com.eastTrip.backendSpringBoot.dto;

public class UserPropertyCountDTO {
    private Long userId;
    private Long count;

    public UserPropertyCountDTO(Long userId, Long count) {
        this.userId = userId;
        this.count = count;
    }

    // Getters
    public Long getUserId() {
        return userId;
    }

    public Long getCount() {
        return count;
    }
}
