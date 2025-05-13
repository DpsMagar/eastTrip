package com.eastTrip.backendSpringBoot.controller;

import com.eastTrip.backendSpringBoot.dto.HotelReviewRequest;
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
    public HotelReview addReview(@RequestBody HotelReviewRequest request) {
        return reviewService.createReview(
                request.hotelId, request.userId, request.rating, request.comment
        );
    }


    @GetMapping("/{hotelId}")
    public List<HotelReviewRequest> getReviews(@PathVariable Long hotelId) {
        return reviewService.getReviewsForHotel(hotelId);
    }
}
