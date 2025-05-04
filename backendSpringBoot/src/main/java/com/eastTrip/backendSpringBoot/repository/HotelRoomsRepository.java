package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.HotelRooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelRoomsRepository extends JpaRepository<HotelRooms, Integer> {
    Optional<Object> findById(Long roomId);
//    List<HotelRooms> findAllById(List<Long> roomFeatureIds);
}
