package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.HotelRooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRoomsRepository extends JpaRepository<HotelRooms, Integer> {
//    List<HotelRooms> findAllById(List<Long> roomFeatureIds);
}
