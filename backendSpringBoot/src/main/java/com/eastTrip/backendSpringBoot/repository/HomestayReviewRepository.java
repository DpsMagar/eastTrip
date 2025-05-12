package com.eastTrip.backendSpringBoot.repository;

import com.eastTrip.backendSpringBoot.model.HomestayReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HomestayReviewRepository extends JpaRepository<HomestayReview, Long> {
    List<HomestayReview> findByHomestayId(Long homestayId);
}
