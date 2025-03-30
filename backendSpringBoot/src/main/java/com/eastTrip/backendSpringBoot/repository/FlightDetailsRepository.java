package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.Airport;
import com.eastTrip.backendSpringBoot.model.FlightDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightDetailsRepository extends JpaRepository<FlightDetails, Long> {
    List<FlightDetails> findByFromAirportAndToAirport(Airport from, Airport to);
}
