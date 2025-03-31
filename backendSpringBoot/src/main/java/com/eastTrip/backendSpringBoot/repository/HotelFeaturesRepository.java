package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.HotelFeatures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelFeaturesRepository extends JpaRepository<HotelFeatures, Integer> {
}
