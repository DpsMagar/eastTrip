package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.Airport;
import com.eastTrip.backendSpringBoot.model.AirportOpeningDay;
import com.eastTrip.backendSpringBoot.model.DayOfWeek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportOpeningDayRepository extends JpaRepository<AirportOpeningDay, Long> {
    AirportOpeningDay findByAirportAndDayOfWeek(Airport airport, DayOfWeek dayOfWeek);
}
