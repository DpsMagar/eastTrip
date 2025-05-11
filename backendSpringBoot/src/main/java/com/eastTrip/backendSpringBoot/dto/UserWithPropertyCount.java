package com.eastTrip.backendSpringBoot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWithPropertyCount {
    private Long id;
    private String fullName;
    private String email;
    private Long count;


}
