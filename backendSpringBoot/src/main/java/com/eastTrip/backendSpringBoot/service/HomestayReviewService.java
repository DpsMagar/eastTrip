package com.eastTrip.backendSpringBoot.service;


import com.eastTrip.backendSpringBoot.dto.HomestayReviewRequestDTO;
import com.eastTrip.backendSpringBoot.dto.HotelReviewRequestDTO;
import com.eastTrip.backendSpringBoot.model.HomeStay;
import com.eastTrip.backendSpringBoot.model.HomestayReview;
import com.eastTrip.backendSpringBoot.model.HotelReview;
import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.repository.HomeStayRepository;
import com.eastTrip.backendSpringBoot.repository.HomestayReviewRepository;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import com.eastTrip.backendSpringBoot.util.TimespanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<HomestayReviewRequestDTO> getReviewsForHomestay(Long homestayId) {

        List<HomestayReview> homestayReview = reviewRepo.findByHomestayId(homestayId);

        List<HomestayReviewRequestDTO> homestayReviewRequest = new ArrayList<>();

        for (HomestayReview review : homestayReview) {
            HomestayReviewRequestDTO request = new HomestayReviewRequestDTO();
            request.setHomestayId((long) review.getHomestay().getId());
            request.setUserId(review.getUser().getId());
            request.setRating(review.getRating());
            request.setComment(review.getComment());
            request.setTimeSpan(TimespanUtils.getTimeSpan(review.getCreatedAt()));
            request.setName(review.getUser().getFullName());
            homestayReviewRequest.add(request);
        }
        return homestayReviewRequest;    }
}
