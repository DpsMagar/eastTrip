package com.eastTrip.backendSpringBoot.repository;

import com.eastTrip.backendSpringBoot.model.HotelReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelReviewRepository extends JpaRepository<HotelReview, Long> {
    List<HotelReview> findByHotelId(Long hotelId);
}
