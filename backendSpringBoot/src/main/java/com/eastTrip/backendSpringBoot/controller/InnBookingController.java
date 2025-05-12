package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.InnBookingRequestDTO;
import com.eastTrip.backendSpringBoot.dto.InnBookingResponseDTO;
import com.eastTrip.backendSpringBoot.service.InnBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inn-bookings")
@RequiredArgsConstructor
public class InnBookingController {


    private final InnBookingService innBookingService;

    @PostMapping
    public ResponseEntity<InnBookingResponseDTO> createBooking(
            @RequestBody InnBookingRequestDTO request
    ) {

        InnBookingResponseDTO response = innBookingService.createBooking(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InnBookingResponseDTO>> getBookingsByUserId(
            @PathVariable Long userId
    ) {
        List<InnBookingResponseDTO> bookings = innBookingService.getBookingsByUserId(userId);
        return ResponseEntity.ok(bookings);
    }
    @GetMapping("/all-bookings")
    public ResponseEntity<List<InnBookingResponseDTO>> getAllBookings() {
        return ResponseEntity.ok(innBookingService.getAllBookings());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        innBookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }

}
