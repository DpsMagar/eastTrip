package com.eastTrip.backendSpringBoot.repository;

import com.eastTrip.backendSpringBoot.model.InnBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InnBookingRepository extends JpaRepository<InnBooking, Long> {
    InnBooking findByUserIdAndInnIdAndInnType(Long userId, int innId, int innType);

    List<InnBooking> findByUser_Id(Long userId);
}
