package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    boolean existsByFullName(String fullName);

    Optional<User> findByEmail(String email);
}
