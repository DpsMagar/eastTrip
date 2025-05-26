package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.HotelReviewRequestDTO;
import com.eastTrip.backendSpringBoot.model.HotelReview;
import com.eastTrip.backendSpringBoot.service.HotelReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotel-reviews")
public class HotelReviewController {

    private final HotelReviewService reviewService;

    public HotelReviewController(HotelReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public HotelReview addReview(@RequestBody HotelReviewRequestDTO request) {
        return reviewService.createReview(
                request.hId, request.userId, request.rating, request.comment
        );
    }


    @GetMapping("/{hotelId}")
    public List<HotelReviewRequestDTO> getReviews(@PathVariable Long hotelId) {
        return reviewService.getReviewsForHotel(hotelId);
    }
}
