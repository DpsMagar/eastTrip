package com.eastTrip.backendSpringBoot.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {
    private double amount;
    private String productId;
    // Getters and Setters
}