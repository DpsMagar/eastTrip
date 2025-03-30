package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.AirportOpeningDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportOpeningDayRepository extends JpaRepository<AirportOpeningDay, Long> {
}
