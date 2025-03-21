package com.eastTrip.backendSpringBoot.repository;


import com.eastTrip.backendSpringBoot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByEmail(String email);

    boolean existsByFullName(String fullName);
}
