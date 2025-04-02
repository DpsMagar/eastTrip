package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.HomeStayRooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeStayRoomsRepository extends JpaRepository<HomeStayRooms, Integer> {
}
