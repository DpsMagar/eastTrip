package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
}
