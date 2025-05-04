package com.eastTrip.backendSpringBoot.repository;

import com.eastTrip.backendSpringBoot.model.InnBooking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InnBookingRepository extends JpaRepository<InnBooking, Long> {
    InnBooking findByUserIdAndInnIdAndInnType(Long userId, int innId, int innType);
}
