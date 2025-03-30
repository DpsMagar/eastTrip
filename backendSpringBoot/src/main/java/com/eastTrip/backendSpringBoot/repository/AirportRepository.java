package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
    Airport findByCode(String to);
//    Airport findByCode(String to);
}
