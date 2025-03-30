package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.FlightDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightDetailsRepository extends JpaRepository<FlightDetails, Long> {
}
