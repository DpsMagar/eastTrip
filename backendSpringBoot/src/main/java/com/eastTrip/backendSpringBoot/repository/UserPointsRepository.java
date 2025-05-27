package com.eastTrip.backendSpringBoot.repository;

import com.eastTrip.backendSpringBoot.model.User;
import com.eastTrip.backendSpringBoot.model.UserPoints;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserPointsRepository extends JpaRepository<UserPoints, Integer> {
    UserPoints findByUser(User user);
    Optional<UserPoints> findByUserId(Long userId);

//    List<UserPoints> findByUser(User user);
}
