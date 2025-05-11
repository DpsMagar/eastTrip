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
//        System.out.println("============================================================");
//        System.out.println(request);
//        System.out.println("============================================================");

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

}
