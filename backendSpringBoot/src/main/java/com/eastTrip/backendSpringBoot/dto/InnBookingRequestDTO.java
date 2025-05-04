package com.eastTrip.backendSpringBoot.dto;

import lombok.Data;

@Data
public class InnBookingRequestDTO {
    private String innName;
    private Long userId;
    private Long innId;
    private Long numberOfRooms;
    private String checkInDate;
    private String checkOutDate;
    private int numberOfGuests;
    private int totalPrice;
}
