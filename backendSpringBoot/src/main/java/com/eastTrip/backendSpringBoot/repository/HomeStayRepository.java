package com.eastTrip.backendSpringBoot.repository;

import com.eastTrip.backendSpringBoot.model.HomeStay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeStayRepository extends JpaRepository<HomeStay, Integer> {
}
