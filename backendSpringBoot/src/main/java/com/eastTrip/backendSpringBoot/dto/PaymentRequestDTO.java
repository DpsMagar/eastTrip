package com.eastTrip.backendSpringBoot.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequestDTO {
    private double totalAmount;
    private double amount;
    private double taxAmount;
    private double serviceCharge;
    private double deliveryCharge;
    private String productId;
    // getters and setters
}
