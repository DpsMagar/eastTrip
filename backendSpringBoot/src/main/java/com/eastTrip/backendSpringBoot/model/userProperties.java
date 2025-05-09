package com.eastTrip.backendSpringBoot.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class userProperties {

    @Id
    @GeneratedValue
    private Long id;

    private Integer userId;

    private Integer propertyId;
    private Integer propertyType;
    private boolean isListed;
}
