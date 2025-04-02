package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.HomeStayFeatures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface HomeStayServicesRepository extends JpaRepository<HomeStayFeatures, Integer> {
}
