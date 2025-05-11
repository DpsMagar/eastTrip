package com.eastTrip.backendSpringBoot.service;

import com.eastTrip.backendSpringBoot.dto.InnBookingRequestDTO;
import com.eastTrip.backendSpringBoot.dto.InnBookingResponseDTO;
import com.eastTrip.backendSpringBoot.model.*;
import com.eastTrip.backendSpringBoot.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InnBookingService {


    private final UserRepository userRepository;
    private final InnBookingRepository innBookingRepository;

    public InnBookingResponseDTO createBooking(InnBookingRequestDTO dto) {
        try {
            if (dto == null) {
                throw new IllegalArgumentException("Booking request cannot be null");
            }

            if (dto.getTotalPrice() <= 0 || dto.getNumberOfGuests() <= 0 || dto.getNumberOfRooms() <= 0) {
                throw new IllegalArgumentException("Total price, number of guests, and number of rooms must be greater than 0");
            }



            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + dto.getUserId()));

            LocalDate checkIn;
            LocalDate checkOut;
            try {
                checkIn = LocalDate.parse(dto.getCheckInDate());
                checkOut = LocalDate.parse(dto.getCheckOutDate());
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid date format. Use ISO format: yyyy-MM-dd");
            }

            int days = (int) (checkOut.toEpochDay() - checkIn.toEpochDay());
            if (days <= 0) {
                throw new IllegalArgumentException("Check-out date must be after check-in date");
            }

            int totalPrice = dto.getTotalPrice() * days;

            InnBooking existingBooking = innBookingRepository.findByUserIdAndInnIdAndInnType(
                    dto.getUserId(), dto.getInnId(), dto.getInnType());

            InnBooking booking;
            if (existingBooking != null) {
                // Update existing booking
                existingBooking.setCheckInDate(checkIn);
                existingBooking.setCheckOutDate(checkOut);
                existingBooking.setNumberOfGuests(dto.getNumberOfGuests());
                existingBooking.setTotalPrice(totalPrice);
                existingBooking.setConfirmed(true);
                existingBooking.setName(dto.getName());
                existingBooking.setNumberOfRooms(Math.toIntExact(dto.getNumberOfRooms()));

                booking = innBookingRepository.save(existingBooking);
            } else {
                // Create new booking
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
                newBooking.setNumberOfRooms(Math.toIntExact(dto.getNumberOfRooms()));

                booking = innBookingRepository.save(newBooking);
            }

            return InnBookingResponseDTO.builder()
                    .name(booking.getName())
                    .checkInDate(booking.getCheckInDate().toString())
                    .checkOutDate(booking.getCheckOutDate().toString())
                    .numberOfGuests(booking.getNumberOfGuests())
                    .totalPrice(booking.getTotalPrice())
                    .userId(booking.getUser().getId())
                    .innId(booking.getInnId())
                    .numberOfRooms((long) booking.getNumberOfRooms())
                    .innType(booking.getInnType())
                    .build();

        } catch (IllegalArgumentException e) {
            // You can log the error or rethrow to be handled by a global exception handler
            throw e;
        } catch (Exception e) {
            // Catch-all for unexpected errors
            throw new RuntimeException("Failed to process booking request", e);
        }
    }


    public List<InnBookingResponseDTO> getBookingsByUserId(Long userId) {
        List<InnBooking> bookings = innBookingRepository.findByUser_Id((userId));

        return bookings.stream()
                .map(booking -> InnBookingResponseDTO.builder()
                        .name(booking.getName())
                        .userId(booking.getUser().getId())
                        .innId(booking.getInnId())
                        .numberOfRooms((long) booking.getNumberOfRooms())
                        .checkInDate(booking.getCheckInDate().toString())
                        .checkOutDate(booking.getCheckOutDate().toString())
                        .numberOfGuests(booking.getNumberOfGuests())
                        .totalPrice(booking.getTotalPrice())
                        .innType(booking.getInnType())
                        .build())
                .collect(Collectors.toList());
    }


}
