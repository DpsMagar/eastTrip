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

        // Calculate total price
        int totalPrice = dto.getTotalPrice() * days;

        // Check if booking with the same userId, innId, and innType already exists
        InnBooking existingBooking = bookingRepo.findByUserIdAndInnIdAndInnType(dto.getUserId(), dto.getInnId(), dto.getInnType());

        if (existingBooking != null) {
            // Update the existing booking with the new details
            existingBooking.setCheckInDate(checkIn);
            existingBooking.setCheckOutDate(checkOut);
            existingBooking.setNumberOfGuests(dto.getNumberOfGuests());
            existingBooking.setTotalPrice(totalPrice);
            existingBooking.setConfirmed(true);
            existingBooking.setName(dto.getName());
            existingBooking.setNumberOfRooms(Math.toIntExact(dto.getNumberOfRooms()));

            // Save the updated booking
            InnBooking updatedBooking = bookingRepo.save(existingBooking);

            return InnBookingResponseDTO.builder()
                    .name(updatedBooking.getName())
                    .checkInDate(updatedBooking.getCheckInDate().toString())
                    .checkOutDate(updatedBooking.getCheckOutDate().toString())
                    .numberOfGuests(updatedBooking.getNumberOfGuests())
                    .totalPrice(updatedBooking.getTotalPrice())
                    .userId(updatedBooking.getUser().getId())
                    .innId(updatedBooking.getInnId())
                    .numberOfRooms((long) updatedBooking.getNumberOfRooms())
                    .innType(updatedBooking.getInnType())
                    .build();

        } else {
            // If no existing booking, create a new one
            InnBooking newBooking = new InnBooking();
            newBooking.setUser(user);
            newBooking.setName(dto.getName());
            newBooking.setInnType(dto.getInnType());
            newBooking.setCheckInDate(checkIn);
            newBooking.setCheckOutDate(checkOut);
            newBooking.setNumberOfGuests(dto.getNumberOfGuests());
            newBooking.setTotalPrice(totalPrice);
            newBooking.setConfirmed(true);
            newBooking.setInnId(dto.getInnId());

            InnBooking savedBooking = bookingRepo.save(newBooking);

            return InnBookingResponseDTO.builder()
                    .name(savedBooking.getName())
                    .checkInDate(savedBooking.getCheckInDate().toString())
                    .checkOutDate(savedBooking.getCheckOutDate().toString())
                    .numberOfGuests(savedBooking.getNumberOfGuests())
                    .totalPrice(savedBooking.getTotalPrice())
                    .userId(savedBooking.getUser().getId())
                    .innId(savedBooking.getInnId())
                    .numberOfRooms(dto.getNumberOfRooms())
                    .innType(savedBooking.getInnType())
                    .build();
        }
    }

}
