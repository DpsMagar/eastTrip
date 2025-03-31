package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.dto.HotelSearchResultsDTO;
import com.eastTrip.backendSpringBoot.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.Set;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    Set<HotelSearchResultsDTO> findAllByName(String name);

    Arrays findByCity(String cityName);
}
