package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.InnBookingRequestDTO;
import com.eastTrip.backendSpringBoot.dto.InnBookingResponseDTO;
import com.eastTrip.backendSpringBoot.model.*;
import com.eastTrip.backendSpringBoot.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class InnBookingService {

    private final InnBookingRepository bookingRepo;
    private final UserRepository userRepo;
    private final HotelRepository hotelRepo;
    private final HotelRoomsRepository roomRepo;

    public InnBookingResponseDTO createBooking(InnBookingRequestDTO dto) {

        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        LocalDate checkIn = LocalDate.parse(dto.getCheckInDate());
        LocalDate checkOut = LocalDate.parse(dto.getCheckOutDate());

        int days = (int) (checkOut.toEpochDay() - checkIn.toEpochDay());
        if (days <= 0) {
            throw new IllegalArgumentException("Check-out date must be after check-in date");
        }

        if ( dto.getInnType() == 1){

        }

        int totalPrice = dto.getTotalPrice() * days;

        InnBooking booking = new InnBooking();
        booking.setUser(user);
        booking.setName(dto.getName());
        booking.setInnType(dto.getInnType());
        booking.setCheckInDate(checkIn);
        booking.setCheckOutDate(checkOut);
        booking.setNumberOfGuests(dto.getNumberOfGuests());
        booking.setTotalPrice(totalPrice);
        booking.setConfirmed(true);
        booking.setInnId(dto.getInnId());

        InnBooking saved = bookingRepo.save(booking);

        return InnBookingResponseDTO.builder()
                .name(dto.getName())
                .checkInDate(checkIn.toString())
                .checkOutDate(checkOut.toString())
                .numberOfGuests(dto.getNumberOfGuests())
                .totalPrice(totalPrice)
                .userId(dto.getUserId())
                .innId(saved.getInnId())
                .numberOfRooms(dto.getNumberOfRooms())
                .innType(dto.getInnType())
                .build();
    }
}
