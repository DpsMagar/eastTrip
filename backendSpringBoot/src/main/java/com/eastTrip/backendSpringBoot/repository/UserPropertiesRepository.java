package com.eastTrip.backendSpringBoot.repository;

import com.eastTrip.backendSpringBoot.dto.UserWithPropertyCount;
import com.eastTrip.backendSpringBoot.model.UserProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserPropertiesRepository extends JpaRepository<UserProperties, Long> {
    List<UserProperties>  findByUserId(Integer userId);

    void deleteByPropertyId(Integer propertyId);

    @Query("SELECT DISTINCT u.userId FROM UserProperties  u")
    List<Long> findDistinctUserIds();

    @Query("SELECT new com.eastTrip.backendSpringBoot.dto.UserWithPropertyCount(u.id, u.fullName, u.email, COUNT(up)) " +
            "FROM UserProperties up JOIN User u ON up.userId = u.id " +
            "GROUP BY u.id, u.fullName, u.email")
    List<UserWithPropertyCount> findUsersWithPropertyCounts();


    void deleteByUserId(Long userId);
}
