package com.eastTrip.backendSpringBoot.controller;


import com.eastTrip.backendSpringBoot.dto.HomestayReviewRequestDTO;
import com.eastTrip.backendSpringBoot.model.HomestayReview;
import com.eastTrip.backendSpringBoot.service.HomestayReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/homestay-reviews")
public class HomestayReviewController {

    private final HomestayReviewService reviewService;

    public HomestayReviewController(HomestayReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public HomestayReview addReview(@RequestBody HomestayReviewRequestDTO request) {
        return reviewService.createReview(
                request.hId, request.userId, request.rating, request.comment
        );
    }


    @GetMapping("/{homestayId}")
    public List<HomestayReviewRequestDTO> getReviews(@PathVariable Long homestayId) {
        return reviewService.getReviewsForHomestay(homestayId);
    }
}
