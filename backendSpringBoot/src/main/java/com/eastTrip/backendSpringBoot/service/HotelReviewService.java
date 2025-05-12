package com.eastTrip.backendSpringBoot.service;


import com.eastTrip.backendSpringBoot.model.Hotel;
import com.eastTrip.backendSpringBoot.model.HotelReview;
import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.repository.HotelRepository;
import com.eastTrip.backendSpringBoot.repository.HotelReviewRepository;
import com.eastTrip.backendSpringBoot.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelReviewService {

    private final HotelReviewRepository reviewRepo;
    private final HotelRepository hotelRepo;
    private final UserRepository userRepo;

    public HotelReviewService(HotelReviewRepository reviewRepo, HotelRepository hotelRepo, UserRepository userRepo) {
        this.reviewRepo = reviewRepo;
        this.hotelRepo = hotelRepo;
        this.userRepo = userRepo;
    }

    public HotelReview createReview(Long hotelId, Long userId, int rating, String comment) {
        Hotel hotel = hotelRepo.findById(hotelId).orElseThrow();
        User user = userRepo.findById(userId).orElseThrow();

        HotelReview review = new HotelReview();
        review.setHotel(hotel);
        review.setUser(user);
        review.setRating(rating);
        review.setComment(comment);

        return reviewRepo.save(review);
    }

    public List<HotelReview> getReviewsForHotel(Long hotelId) {
        return reviewRepo.findByHotelId(hotelId);
    }
}
