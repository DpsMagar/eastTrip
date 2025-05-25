package com.eastTrip.backendSpringBoot.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InnBookingResponseDTO {
    private Long colsId;
    private String name;
    private Long userId;
    private int innId;
    private Long numberOfRooms;
    private String checkInDate;
    private String checkOutDate;
    private int numberOfGuests;
    private int totalPrice;
    private int innType;
    private  boolean hasPaid;
}
