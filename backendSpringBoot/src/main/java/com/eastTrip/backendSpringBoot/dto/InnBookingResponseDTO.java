package com.eastTrip.backendSpringBoot.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InnBookingResponseDTO {
    private Long bookingId;
    private String hotelName;
    private String roomType;
    private int numberOfGuests;
    private String checkInDate;
    private String checkOutDate;
    private int totalPrice;
    private boolean isConfirmed;
}
