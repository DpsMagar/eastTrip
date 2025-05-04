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

        Hotel hotel = (Hotel) hotelRepo.findById(dto.getHotelId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid hotel ID"));

        HotelRooms room = (HotelRooms) roomRepo.findById(dto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid room ID"));

        LocalDate checkIn = LocalDate.parse(dto.getCheckInDate());
        LocalDate checkOut = LocalDate.parse(dto.getCheckOutDate());

        int days = (int) (checkOut.toEpochDay() - checkIn.toEpochDay());
        if (days <= 0) {
            throw new IllegalArgumentException("Check-out date must be after check-in date");
        }

        int totalPrice = room.getPrice() * days;

        InnBooking booking = new InnBooking();
        booking.setUser(user);
        booking.setHotel(hotel);
        booking.setRoom(room);
        booking.setCheckInDate(checkIn);
        booking.setCheckOutDate(checkOut);
        booking.setNumberOfGuests(dto.getNumberOfGuests());
        booking.setTotalPrice(totalPrice);
        booking.setIsConfirmed(true);  // default to confirmed

        InnBooking saved = bookingRepo.save(booking);

        return InnBookingResponseDTO.builder()
                .bookingId(saved.getId())
                .hotelName(hotel.getName())
                .roomType(room.getRoomType())
                .checkInDate(checkIn.toString())
                .checkOutDate(checkOut.toString())
                .numberOfGuests(dto.getNumberOfGuests())
                .totalPrice(totalPrice)
                .isConfirmed(true)
                .build();
    }
}
