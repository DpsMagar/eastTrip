package com.eastTrip.backendSpringBoot.controller;


import com.eastTrip.backendSpringBoot.dto.HomestayReviewRequest;
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
    public HomestayReview addReview(@RequestBody HomestayReviewRequest request) {
        return reviewService.createReview(
                request.homestayId, request.userId, request.rating, request.comment
        );
    }


    @GetMapping("/{homestayId}")
    public List<HomestayReview> getReviews(@PathVariable Long homestayId) {
        return reviewService.getReviewsForHomestay(homestayId);
    }
}
