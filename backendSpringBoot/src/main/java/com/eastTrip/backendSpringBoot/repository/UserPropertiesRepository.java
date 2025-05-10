package com.eastTrip.backendSpringBoot.repository;

import com.eastTrip.backendSpringBoot.model.userProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserPropertiesRepository extends JpaRepository<userProperties, Long> {
    List<userProperties> findByUserId(Integer userId);

    void deleteByPropertyId(Integer propertyId);
}
