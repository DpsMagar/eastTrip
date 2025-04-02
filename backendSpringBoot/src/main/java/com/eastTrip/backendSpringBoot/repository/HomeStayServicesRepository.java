package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.HomeStayServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface HomeStayServicesRepository extends JpaRepository<HomeStayServices, Integer> {
}
