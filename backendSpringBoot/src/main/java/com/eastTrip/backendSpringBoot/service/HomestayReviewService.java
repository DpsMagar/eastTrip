package com.eastTrip.backendSpringBoot.service;


import com.eastTrip.backendSpringBoot.model.HomeStay;
import com.eastTrip.backendSpringBoot.model.HomestayReview;
import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.repository.HomeStayRepository;
import com.eastTrip.backendSpringBoot.repository.HomestayReviewRepository;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomestayReviewService {

    private final HomestayReviewRepository reviewRepo;
    private final HomeStayRepository homestayRepo;
    private final UserRepository userRepo;

    public HomestayReviewService(HomestayReviewRepository reviewRepo, HomeStayRepository homestayRepo, UserRepository userRepo) {
        this.reviewRepo = reviewRepo;
        this.homestayRepo = homestayRepo;
        this.userRepo = userRepo;
    }

    public HomestayReview createReview(Long homestayId, Long userId, int rating, String comment) {
        HomeStay homestay = homestayRepo.findById(Math.toIntExact(homestayId)).orElseThrow();
        User user = userRepo.findById(userId).orElseThrow();

        HomestayReview review = new HomestayReview();
        review.setHomestay(homestay);
        review.setUser(user);
        review.setRating(rating);
        review.setComment(comment);

        return reviewRepo.save(review);
    }

    public List<HomestayReview> getReviewsForHomestay(Long homestayId) {
        return reviewRepo.findByHomestayId(homestayId);
    }
}
