package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.dto.HotelSearchResultsDTO;
import com.eastTrip.backendSpringBoot.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
//    Set<Hotel> findAllByName(String name);

    List<Hotel> findAllByLocation(String location);

    Optional<Object> findById(Long hotelId);

//    Arrays findByCity(String cityName);
}
